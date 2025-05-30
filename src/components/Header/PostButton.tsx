import React from "react";
import { PlusIcon } from "./icons/PlusIcon";

export const PostButton = () => {
  return (
    <button className="flex relative gap-3.5 items-center px-2.5 py-2 bg-yellow-500 rounded-lg max-sm:gap-2 max-sm:px-2 max-sm:py-1.5">
      <PlusIcon />
      <span className="relative text-base font-bold leading-normal text-white max-sm:text-sm">
        Post
      </span>
    </button>
  );
};
