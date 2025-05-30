"use client";
import React from "react";
import { SearchIcon } from "./icons/SearchIcon";
import { VoiceIcon } from "./icons/VoiceIcon";

export const SearchBar = () => {
  return (
    <div className="flex relative justify-between items-center px-4 py-3 bg-white rounded-lg border-[0.5px_solid_rgba(0,0,0,0.40)] h-[60px] w-[582px] max-md:w-[400px] max-sm:px-3 max-sm:py-2 max-sm:h-[50px] max-sm:w-[200px]">
      <div className="flex relative gap-2 items-center">
        <SearchIcon />
        <input 
        placeholder="Search here"
        className="relative text-base leading-normal w-[400px] text-zinc-600 max-sm:text-sm border-0 outline-0" />
      </div>
      <button aria-label="Voice search">
        <VoiceIcon />
      </button>
    </div>
  );
};
