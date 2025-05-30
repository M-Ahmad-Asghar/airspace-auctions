// Updated EmailInput component to show validation errors
import React from 'react';

interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
  showPasswordField: boolean;
  clearEmail: () => void;
  error?: string;
}

export function EmailInput({ 
  email, 
  setEmail, 
  showPasswordField, 
  clearEmail, 
  error 
}: EmailInputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-2.5 items-center px-5 w-full bg-white rounded-lg border border-solid border-black border-opacity-10 h-[60px]">
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`flex-1 bg-transparent text-base leading-normal text-black placeholder-gray-500 outline-none ${
            error ? 'text-red-600' : ''
          }`}
          disabled={showPasswordField}
        />
        {showPasswordField && (
          <button
            onClick={clearEmail}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            Change
          </button>
        )}
      </div>
      {error && (
        <span className="text-red-500 text-sm ml-1">{error}</span>
      )}
    </div>
  );
}