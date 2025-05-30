import React from 'react';

export const AppDownload: React.FC = () => {
  return (
    <section className="flex flex-col gap-3.5 items-start w-[254px] max-sm:w-full">
      <h3 className="w-full text-base font-bold tracking-widest leading-10 text-black uppercase h-[29px]">
        SHOP FASTER WITH THE APP
      </h3>
      <div className="flex gap-2 items-center w-full">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/af04e145a1fec1f478d44ac60d077cbd269c44d1?placeholderIfAbsent=true"
          alt="Download on the App Store"
          className="w-[128px] h-[38.222px]"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/856c5dbb93bf86ea87790306719f6792bf2f9f68?placeholderIfAbsent=true"
          alt="Get it on Google Play"
          className="w-[111.111px] h-[38.222px]"
        />
      </div>
    </section>
  );
};
