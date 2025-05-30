import React from 'react';
import { SocialIcons } from './SocialIcons';
import { ContactInfo } from './ContactInfo';
import { AppDownload } from './AppDownload';
import { NavigationSection } from './NavigationSection';

const FooterDesign: React.FC = () => {
  const backToTopLinks = [
    "Search",
    "Aircraft",
    "Parts",
    "Events",
    "Real Estate",
    "Places",
    "Services"
  ];

  const helpSupportLinks = [
    "FAQ",
    "How To",
    "Contact",
    "Site Map",
    "Home"
  ];

  const securityLegalLinks = [
    "Security Center",
    "Terms of Use",
    "Advertiser Agreement",
    "Privacy Policy"
  ];

  return (
    <footer className="flex flex-col gap-6 items-center px-20 pt-10 pb-5 w-full bg-neutral-100 max-md:px-10 max-md:py-8 max-sm:p-5">
      <div className="flex gap-32 items-start max-md:flex-wrap max-md:gap-16 max-sm:flex-col max-sm:gap-10">
        <div className="flex flex-col gap-9 items-start w-[351px] max-md:w-[300px] max-sm:w-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/78a626abe1f13905496774313436cd68deaeab63?placeholderIfAbsent=true"
            alt="Airplane Deals Logo"
            className="h-[58.844px] w-full aspect-[351.00/58.84]"
          />
          <ContactInfo />
          <SocialIcons />
          <AppDownload />
        </div>

        <NavigationSection
          title="Back to Top"
          links={backToTopLinks}
          className="w-[148px]"
        />

        <NavigationSection
          title="Help &amp; Support"
          links={helpSupportLinks}
        />

        <NavigationSection
          title="Security &amp; Legal"
          links={securityLegalLinks}
        />
      </div>

      <hr className="h-px bg-neutral-400 w-[1280px] max-md:w-full border-0" />

      <p className="w-full text-base font-bold leading-normal text-center text-black max-sm:text-sm">
        <span>© 2025 </span>
        <span className="font-bold">Airplane Deals</span>
        <span>. All Rights Reserved.</span>
      </p>
    </footer>
  );
};

export default FooterDesign;
