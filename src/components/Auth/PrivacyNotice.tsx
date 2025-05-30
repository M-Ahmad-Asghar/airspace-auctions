import React from "react";

export function PrivacyNotice() {
  return (
    <p className="w-full text-xs tracking-wide leading-normal text-center text-zinc-600">
      <span className="text-black">By continuing, you agree to our </span>
      <button className="text-blue-800 cursor-pointer">
        Privacy & Cookie Policy{" "}
      </button>
      <span className="text-zinc-600">and</span>
      <button className="text-blue-800 cursor-pointer">
        {" "}Terms & Conditions.
      </button>
    </p>
  );
}
