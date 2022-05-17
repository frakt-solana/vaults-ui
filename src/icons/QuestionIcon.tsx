import React from 'react';

const icon = (
  <>
    <g filter="url(#filter0_d_2047_6802)">
      <path
        d="M15.4483 17.662H4.5893C4.74855 13.9628 5.65327 10.9303 7.27425 8.53689L7.27524 8.53541C8.98407 5.99286 11.243 4.10348 14.061 2.86073L14.061 2.86073L14.0637 2.85956C16.8973 1.59043 20.031 0.952148 23.4721 0.952148C27.2677 0.952148 30.6038 1.60261 33.4911 2.88993L33.4937 2.89106C36.3769 4.15707 38.6236 5.98982 40.251 8.38725C41.8702 10.7726 42.6913 13.6624 42.6913 17.0814C42.6913 19.3691 42.3225 21.3834 41.5968 23.1334L41.5958 23.1358C40.8838 24.8788 39.8826 26.4263 38.5906 27.7813C37.287 29.1284 35.743 30.3531 33.9553 31.4539C32.3992 32.4108 31.1056 33.4164 30.0827 34.4737L30.0793 34.4772C29.0631 35.5486 28.3008 36.7888 27.7936 38.1935L27.7936 38.1935L27.7915 38.1996C27.3038 39.6068 27.0576 41.3151 27.0379 43.3112V43.3161V43.8367H17.0311V43.3175C17.0504 39.838 17.3491 37.0975 17.9124 35.0778C18.4971 33.0513 19.3375 31.4431 20.4183 30.2314C21.5276 28.9876 22.8671 27.8554 24.4408 26.8363L24.4409 26.8364L24.4465 26.8326C25.6649 26.0201 26.7594 25.1747 27.7286 24.2956C28.7158 23.4002 29.5074 22.4056 30.098 21.3111L30.0998 21.3076C30.7026 20.169 31.0001 18.907 31.0001 17.5317C31.0001 16.0709 30.6612 14.7672 29.9678 13.638C29.2816 12.5204 28.3526 11.6571 27.1882 11.055C26.0465 10.4545 24.7851 10.1578 23.414 10.1578C22.0764 10.1578 20.8081 10.4668 19.6154 11.0825C18.4088 11.6853 17.424 12.5885 16.6628 13.7787C15.9606 14.8581 15.5626 16.1591 15.4483 17.662ZM15.8113 56.3483H15.8114L15.8113 56.3384C15.7933 54.5085 16.4109 52.9549 17.6733 51.6495C18.9551 50.3439 20.4821 49.6994 22.2814 49.6994C23.9771 49.6994 25.469 50.339 26.7769 51.6532C28.0782 52.9609 28.7318 54.5153 28.7513 56.3421C28.7322 57.5753 28.4165 58.6976 27.8058 59.7187L27.8045 59.7209C27.2059 60.7333 26.4203 61.545 25.4443 62.1622C24.4791 62.7527 23.4282 63.0474 22.2814 63.0474C20.4827 63.0474 18.9561 62.4033 17.6745 61.0985C16.4117 59.7734 15.7933 58.1992 15.8113 56.3483Z"
        stroke="#5D5FEF"
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_2047_6802"
        x="0.0722656"
        y="0.452148"
        width="47.1191"
        height="71.0952"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2047_6802"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2047_6802"
          result="shape"
        />
      </filter>
    </defs>
  </>
);

export const QuestionIcon = ({
  className,
  width,
  height,
}: React.SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    className={className || ''}
    width={width || '48'}
    height={height || '72'}
    viewBox="0 0 48 72"
    fill="none"
  >
    {icon}
  </svg>
);
