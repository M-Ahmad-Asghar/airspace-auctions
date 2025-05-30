import React from "react";

interface GoogleAuthButtonProps {
  handleGoogleAuth: () => void;
  showPasswordField: boolean;
  userExists: boolean;
}

export function GoogleAuthButton({ handleGoogleAuth, showPasswordField, userExists }: GoogleAuthButtonProps) {
  return (
    <button
      className="flex gap-4 justify-center items-center px-5 w-full bg-white rounded-lg border border-solid transition-all duration-200 ease-in-out cursor-pointer border-black border-opacity-10 h-[60px]"
      onClick={handleGoogleAuth}
    >
      <svg
        width="39"
        height="38"
        viewBox="0 0 39 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[38px] w-[38px]"
      >
        <g clipPath="url(#clip0_612_2131)">
          <path
            d="M19.5 15.5459V22.9041H29.7254C29.2764 25.2705 27.929 27.2742 25.9081 28.6214L32.0744 33.406C35.6672 30.0897 37.7399 25.2188 37.7399 19.4325C37.7399 18.0852 37.619 16.7896 37.3944 15.5461L19.5 15.5459Z"
            fill="#4285F4"
          />
          <path
            d="M8.85066 22.6162L7.45992 23.6808L2.53711 27.5153C5.66346 33.7161 12.0712 37.9998 19.4984 37.9998C24.6283 37.9998 28.9291 36.3071 32.0728 33.4054L25.9065 28.6208C24.2137 29.7608 22.0546 30.4517 19.4984 30.4517C14.5584 30.4517 10.3613 27.1181 8.85843 22.6272L8.85066 22.6162Z"
            fill="#34A853"
          />
          <path
            d="M2.53803 10.4844C1.24265 13.0406 0.5 15.9252 0.5 18.9997C0.5 22.0742 1.24265 24.9588 2.53803 27.5151C2.53803 27.5322 8.85996 22.6096 8.85996 22.6096C8.47996 21.4696 8.25535 20.2606 8.25535 18.9995C8.25535 17.7384 8.47996 16.5294 8.85996 15.3894L2.53803 10.4844Z"
            fill="#FBBC05"
          />
          <path
            d="M19.4988 7.56545C22.297 7.56545 24.7842 8.5327 26.7706 10.3982L32.2114 4.95734C28.9123 1.88284 24.6288 0 19.4988 0C12.0716 0 5.66346 4.26636 2.53711 10.4846L8.85884 15.39C10.3615 10.8991 14.5588 7.56545 19.4988 7.56545Z"
            fill="#EA4335"
          />
        </g>
        <defs>
          <clipPath id="clip0_612_2131">
            <rect
              width="38"
              height="38"
              fill="white"
              transform="translate(0.5)"
            />
          </clipPath>
        </defs>
      </svg>
      <span className="text-base leading-normal text-black">
        {showPasswordField ? (
          userExists ? "Continue with Google" : "Sign up with Google"
        ) : (
          "Continue with Google"
        )}
      </span>
    </button>
  );
}
