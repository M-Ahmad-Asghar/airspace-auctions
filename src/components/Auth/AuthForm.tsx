"use client";
import * as React from "react";
import { useState } from "react";
import { SecurityHeader } from "./SecurityHeader";
import { EmailInput } from "./EmailInput";
import { PasswordInput } from "./PasswordInput";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { PrivacyNotice } from "./PrivacyNotice";
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { validateEmail, validatePassword, validateName } from '@/lib/validations';

interface ApiResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  userExists?: boolean;
  provider?: string;
  user?: any;
}

export function AuthForm() {
  const [showPasswordField, setShowPasswordField] = useState<boolean>(false);
  const [userExists, setUserExists] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  const router = useRouter();

  const clearEmail = () => {
    setEmail("");
    setPassword("");
    setName("");
    setShowPasswordField(false);
    setUserExists(false);
    setErrors({});
    setSuccessMessage("");
  };

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      newErrors.email = emailError;
    }

    // Validate password if shown
    if (showPasswordField) {
      const passwordError = validatePassword(password);
      if (passwordError) {
        newErrors.password = passwordError;
      }

      // Validate name for signup
      if (!userExists) {
        const nameError = validateName(name);
        if (nameError) {
          newErrors.name = nameError;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if user exists
  const checkUser = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      const response = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data: ApiResponse = await response.json();

      if (data.success) {
        if (data.provider === 'google') {
          setErrors({ general: data.message });
          return;
        }
        
        setUserExists(data.userExists || false);
        setShowPasswordField(true);
      } else {
        setErrors(data.errors || { general: data.message });
      }
    } catch (error) {
      console.error('Check user error:', error);
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle login
  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setErrors({ general: 'Invalid email or password' });
      } else if (result?.ok) {
        setSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => {
          router.push('/');
        }, 1000);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle signup
  const handleSignup = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password, 
          name: name || email.split('@')[0] 
        }),
      });

      const data: ApiResponse = await response.json();

      if (data.success) {
        setSuccessMessage(data.message);
        // Auto-login after successful signup
        setTimeout(async () => {
          const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
          });
          
          if (result?.ok) {
            router.push('/');
          }
        }, 1500);
      } else {
        setErrors(data.errors || { general: data.message });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ general: 'Signup failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (userExists) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  // Handle Google authentication
  const handleGoogleAuth = async () => {
    console.log('Starting Google auth...');
    setErrors({});
    
    try {
      const result = await signIn('google', { 
        callbackUrl: '/',
        redirect: true
      });
      
      console.log('Google auth result:', result);
    } catch (error) {
      console.error('Google auth error:', error);
      setErrors({ general: 'Google authentication failed. Please try again.' });
    }
  };

  return (
    <main className="flex justify-center items-center py-[75px] bg-gray-50">
      <section className="flex flex-col gap-6 items-center px-5 w-full max-w-[625px]">
        <h1 className="w-full text-4xl font-bold leading-normal text-center text-black max-sm:text-3xl">
          {showPasswordField ? (
            userExists ? "Log in" : "Create Your Account"
          ) : (
            "Login / Register"
          )}
        </h1>

        <SecurityHeader showPasswordField={showPasswordField} />

        {/* Success Message */}
        {successMessage && (
          <div className="w-full p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* General Error Message */}
        {errors.general && (
          <div className="w-full p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {errors.general}
          </div>
        )}

        <EmailInput
          email={email}
          setEmail={setEmail}
          showPasswordField={showPasswordField}
          clearEmail={clearEmail}
          error={errors.email}
        />

        {showPasswordField && (
          <>
            {/* Name input for signup */}
            {!userExists && (
              <div className="flex flex-col gap-2 w-full">
                <input
                  type="text"
                  placeholder="Full Name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>
            )}

            <PasswordInput
              password={password}
              setPassword={setPassword}
              userExists={userExists}
              error={errors.password}
            />
          </>
        )}

        <button
          className="flex gap-2.5 justify-center items-center px-5 w-full bg-yellow-500 rounded-lg border border-solid transition-all duration-200 ease-in-out cursor-pointer border-black border-opacity-10 h-[60px] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={showPasswordField ? handleSubmit : checkUser}
          disabled={isLoading}
        >
          <span className="text-base font-bold leading-normal text-white">
            {isLoading ? "Processing..." : (
              showPasswordField ? (
                userExists ? "Log in" : "Create Account"
              ) : "Continue"
            )}
          </span>
        </button>

        <div className="flex gap-6 items-center w-full">
          <div className="flex-1 h-px bg-zinc-600" />
          <p className="text-base font-bold leading-normal text-zinc-600">Or</p>
          <div className="flex-1 h-px bg-zinc-600" />
        </div>

        <GoogleAuthButton
          handleGoogleAuth={handleGoogleAuth}
          showPasswordField={showPasswordField}
          userExists={userExists}
        />

        <PrivacyNotice />
      </section>
    </main>
  );
}

export default AuthForm;