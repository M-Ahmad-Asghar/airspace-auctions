import React from "react";

export const NavigationHeader = () => {
  return (
    <div className="flex items-center justify-center gap-[489px] px-20 py-4 relative bg-[#305DB3]">
      <div className="inline-flex items-center gap-[60px] relative flex-[0_0_auto]">
        <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-white text-base tracking-[0] leading-[normal] whitespace-nowrap">
            Aircraft
          </div>
        </div>

        <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-white text-base tracking-[0] leading-[normal] whitespace-nowrap">
            Parts
          </div>
        </div>

        <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-white text-base tracking-[0] leading-[normal] whitespace-nowrap">
            Events
          </div>
        </div>

        <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-white text-base tracking-[0] leading-[normal] whitespace-nowrap">
            Real Estate
          </div>
        </div>

        <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-white text-base tracking-[0] leading-[normal] whitespace-nowrap">
            Places
          </div>
        </div>

        <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-white text-base tracking-[0] leading-[normal] whitespace-nowrap">
            Services
          </div>
        </div>
      </div>
    </div>
  );
};
