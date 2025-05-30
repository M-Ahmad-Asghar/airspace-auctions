import React from 'react';

interface NavigationSectionProps {
  title: string;
  links: string[];
  className?: string;
}

export const NavigationSection: React.FC<NavigationSectionProps> = ({
  title,
  links,
  className = ""
}) => {
  return (
    <section className={`flex flex-col gap-6 items-start max-sm:w-full ${className}`}>
      <h2 className="gap-2.5 py-2.5 w-full text-3xl font-bold leading-normal text-black text-nowrap max-sm:text-2xl">
        {title}
      </h2>
      <nav className="flex flex-col gap-3.5 items-start w-[94px] max-sm:w-full">
        {links.map((link, index) => (
          <a
            key={index}
            href="#"
            className="w-full text-lg leading-normal text-black hover:underline"
          >
            {link}
          </a>
        ))}
      </nav>
    </section>
  );
};
