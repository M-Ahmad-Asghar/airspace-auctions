import * as React from "react";

interface CallToActionButtonProps {
  text: string;
  onClick?: () => void;
}

export function CallToActionButton({ text, onClick }: CallToActionButtonProps) {
  return (
    <button
      className="gap-2.5 self-stretch px-2.5 py-3.5 mt-2.5 max-w-full text-base font-semibold text-center text-white bg-yellow-500 rounded-lg min-h-[47px] w-[221px]"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
