import React from 'react';

const icon = (
  <>
    <path
      d="M1.34239 6.31358C1.79722 6.31358 2.13654 5.98148 2.13654 5.51943V5.00684L1.98493 2.76876L3.65266 4.52312L5.71746 6.60236C5.86907 6.76119 6.064 6.83339 6.27337 6.83339C6.7643 6.83339 7.11806 6.50129 7.11806 6.01036C7.11806 5.78655 7.03142 5.59162 6.87981 5.43279L4.80779 3.36077L3.04621 1.70026L5.29872 1.85188H5.86185C6.31669 1.85188 6.66323 1.51978 6.66323 1.05772C6.66323 0.595668 6.3239 0.256348 5.86185 0.256348H1.85498C1.02473 0.256348 0.541016 0.74006 0.541016 1.57031V5.51943C0.541016 5.97426 0.880336 6.31358 1.34239 6.31358ZM9.13232 14.1829H13.1392C13.9694 14.1829 14.4532 13.6992 14.4532 12.869V8.91985C14.4532 8.46502 14.1066 8.1257 13.6518 8.1257C13.197 8.1257 12.8576 8.4578 12.8576 8.91985V9.43244L13.0092 11.6705L11.3415 9.91615L9.27672 7.83691C9.1251 7.67808 8.93018 7.60589 8.71359 7.60589C8.22266 7.60589 7.8689 7.93799 7.8689 8.42892C7.8689 8.65273 7.95553 8.85487 8.11436 9.00649L10.1864 11.0785L11.948 12.739L9.69545 12.5874H9.13232C8.67027 12.5874 8.33095 12.9195 8.33095 13.3816C8.33095 13.8436 8.67027 14.1829 9.13232 14.1829Z"
      fill="white"
    />
  </>
);

export const SellIcon = ({
  className,
  width,
}: React.SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    className={className || ''}
    width={width || '15'}
    height="15"
    viewBox="0 0 15 15"
    fill="none"
  >
    {icon}
  </svg>
);
