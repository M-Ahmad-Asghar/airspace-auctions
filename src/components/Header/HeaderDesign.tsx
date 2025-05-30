"use client";
import * as React from "react";
import { SearchBar } from "./SearchBar";
import { PostButton } from "./PostButton";
import { NavigationIcons } from "./NavigationIcons";

export default function HeaderDesign() {
  return (
    <header className="flex relative justify-between items-center px-20 py-4 w-full bg-neutral-100 max-md:px-10 max-md:py-4 max-sm:px-5 max-sm:py-4">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf06632b0a7af1eb46e5f51254c7d800c4cf3e5d?placeholderIfAbsent=true"
        alt=""
        className="w-[323px] max-lg:w-[250px] max-sm:w-[200px] h-[54px] max-lg:h-[42px] max-sm:h-[34px] relative"
      />
      <SearchBar />
      <nav className="flex relative gap-4 items-center max-sm:gap-2">
        <PostButton />
        <NavigationIcons />
      </nav>
    </header>
  );
}
