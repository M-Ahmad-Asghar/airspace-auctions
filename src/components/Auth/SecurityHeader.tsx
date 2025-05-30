import React from "react";

interface SecurityHeaderProps {
  showPasswordField: boolean;
}

export function SecurityHeader({ showPasswordField }: SecurityHeaderProps) {
  return (
    <div className="flex gap-3.5 items-center w-full">
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
      >
        <path
          d="M12.5 17C11.39 17 10.5 16.1 10.5 15C10.5 13.89 11.39 13 12.5 13C13.0304 13 13.5391 13.2107 13.9142 13.5858C14.2893 13.9609 14.5 14.4696 14.5 15C14.5 15.5304 14.2893 16.0391 13.9142 16.4142C13.5391 16.7893 13.0304 17 12.5 17ZM18.5 20V10H6.5V20H18.5ZM18.5 8C19.0304 8 19.5391 8.21071 19.9142 8.58579C20.2893 8.96086 20.5 9.46957 20.5 10V20C20.5 20.5304 20.2893 21.0391 19.9142 21.4142C19.5391 21.7893 19.0304 22 18.5 22H6.5C5.39 22 4.5 21.1 4.5 20V10C4.5 8.89 5.39 8 6.5 8H7.5V6C7.5 4.67392 8.02678 3.40215 8.96447 2.46447C9.90215 1.52678 11.1739 1 12.5 1C13.1566 1 13.8068 1.12933 14.4134 1.3806C15.02 1.63188 15.5712 2.00017 16.0355 2.46447C16.4998 2.92876 16.8681 3.47995 17.1194 4.08658C17.3707 4.69321 17.5 5.34339 17.5 6V8H18.5ZM12.5 3C11.7044 3 10.9413 3.31607 10.3787 3.87868C9.81607 4.44129 9.5 5.20435 9.5 6V8H15.5V6C15.5 5.20435 15.1839 4.44129 14.6213 3.87868C14.0587 3.31607 13.2956 3 12.5 3Z"
          fill="black"
        />
      </svg>
      <p className="text-lg leading-normal text-zinc-600 max-sm:text-base">
        {showPasswordField ? (
          "Simple and secure"
        ) : (
          "We use industry-standard encryption to keep your data safe."
        )}
      </p>
    </div>
  );
}
