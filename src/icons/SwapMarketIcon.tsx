import React from 'react';

const icon = (
  <>
    <path
      d="M4.74215 0.595459L1.10348 4.32077C0.959089 4.46516 0.865234 4.68896 0.865234 4.88389C0.865234 5.33873 1.1829 5.64917 1.63051 5.64917C1.8471 5.64917 2.02037 5.57697 2.16476 5.42536L3.652 3.88037L4.60498 2.78299L4.54722 4.31355V13.3164C4.54722 13.7712 4.87211 14.0961 5.31972 14.0961C5.76733 14.0961 6.085 13.7712 6.085 13.3164V4.31355L6.03446 2.78299L6.98022 3.88037L8.46746 5.42536C8.61185 5.57697 8.79234 5.64917 9.00893 5.64917C9.44932 5.64917 9.76699 5.33873 9.76699 4.88389C9.76699 4.68896 9.67313 4.46516 9.52874 4.32077L5.89007 0.595459C5.57241 0.263358 5.06703 0.256138 4.74215 0.595459ZM14.2576 13.8434L17.8962 10.1181C18.0406 9.96648 18.1345 9.74268 18.1345 9.54775C18.1345 9.10013 17.8168 8.78969 17.3692 8.78969C17.1526 8.78969 16.9794 8.86189 16.835 9.00628L15.3477 10.5513L14.3947 11.6486L14.4525 10.1181V1.11527C14.4525 0.674874 14.1276 0.342773 13.68 0.342773C13.2396 0.342773 12.9147 0.674874 12.9147 1.11527V10.1181L12.9653 11.6486L12.0195 10.5513L10.5323 9.00628C10.3879 8.86189 10.2074 8.78969 9.99801 8.78969C9.5504 8.78969 9.23274 9.10013 9.23274 9.54775C9.23274 9.74268 9.32659 9.96648 9.47098 10.1181L13.1097 13.8434C13.4273 14.1827 13.9327 14.1899 14.2576 13.8434Z"
      fill="white"
    />
  </>
);

export const SwapMarketIcon = ({
  className,
  width,
}: React.SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    className={className || ''}
    width={width || '19'}
    height="15"
    viewBox="0 0 19 15"
    fill="none"
  >
    {icon}
  </svg>
);