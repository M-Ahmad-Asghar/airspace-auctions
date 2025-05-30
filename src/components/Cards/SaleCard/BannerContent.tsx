import * as React from "react";

export interface BannerContentProps {
  title: string;
  description: string;
}

export function BannerContent({ title, description }: BannerContentProps) {
  return (
    <div className="self-stretch my-auto min-w-60 w-[267px]">
      <h1 className="text-xl font-semibold text-white">
        {title}
      </h1>
      <p className="mt-4 text-lg text-zinc-300">
        {description}
      </p>
    </div>
  );
}
