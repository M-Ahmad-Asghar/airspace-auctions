// Updated PasswordInput component to show validation errors
import React, { useState } from 'react';

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
  userExists: boolean;
  error?: string;
}

export function PasswordInput({ 
  password, 
  setPassword, 
  userExists, 
  error 
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-2.5 items-center px-5 w-full bg-white rounded-lg border border-solid border-black border-opacity-10 h-[60px]">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={userExists ? "Enter your password" : "Create a strong password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`flex-1 bg-transparent text-base leading-normal text-black placeholder-gray-500 outline-none ${
            error ? 'text-red-600' : ''
          }`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="text-gray-500 hover:text-gray-700 text-sm font-medium"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      
      {error && (
        <span className="text-red-500 text-sm ml-1">{error}</span>
      )}
      
      {!userExists && !error && (
        <div className="text-xs text-gray-600 ml-1">
          Password must be at least 8 characters with uppercase, lowercase, and number
        </div>
      )}
    </div>
  );
}