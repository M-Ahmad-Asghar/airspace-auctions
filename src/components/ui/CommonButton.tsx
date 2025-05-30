import * as React from "react";
import { cn } from "@/lib/utils";

export interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "icon";
}

const VARIANTS = {
  primary: "bg-[#F0AD0D] text-white hover:bg-yellow-500",
  secondary: "bg-[#305DB3] text-white hover:bg-blue-700",
  outline: "border border-[#305DB3] text-[#305DB3] hover:bg-blue-50",
  icon: "p-2 rounded-full bg-gray-100 hover:bg-gray-200",
};

export const CommonButton = React.forwardRef<HTMLButtonElement, CommonButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        VARIANTS[variant],
        className
      )}
      {...props}
    />
  )
);

CommonButton.displayName = "CommonButton";