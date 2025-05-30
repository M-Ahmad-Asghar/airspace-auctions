import React from 'react';

export const ContactInfo: React.FC = () => {
  return (
    <div className="flex gap-3.5 items-center">
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html:
              "<svg id=\"600:9195\" layer-name=\"mail-line\" width=\"25\" height=\"25\" viewBox=\"0 0 25 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-[24px] h-[24px]\"> <path d=\"M3.5 3.98926H21.5C22.0523 3.98926 22.5 4.43698 22.5 4.98926V20.9893C22.5 21.5416 22.0523 21.9893 21.5 21.9893H3.5C2.94772 21.9893 2.5 21.5416 2.5 20.9893V4.98926C2.5 4.43698 2.94772 3.98926 3.5 3.98926ZM20.5 8.22718L12.5718 15.3273L4.5 8.2052V19.9893H20.5V8.22718ZM5.01146 5.98926L12.5619 12.6513L20.001 5.98926H5.01146Z\" fill=\"black\"></path> </svg>",
          }}
        />
      </div>
      <a
        href="mailto:Ops@airplanedeals.com"
        className="text-base leading-normal text-black underline"
      >
        Ops@airplanedeals.com
      </a>
    </div>
  );
};
