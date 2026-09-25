import React from 'react';

interface IconProps {
  className?: string;
}

export const LogoutIcon = ({ className = 'h-3.5 w-3.5' }: IconProps) => {
  return (
    <svg
      xmlns="http://w3.org" // 🟢 Исправлено на валидный стандарт W3C
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M19 10a.75.75 0 0 1-.75.75H9.5a.75.75 0 0 1 0-1.5h8.75A.75.75 0 0 1 19 10Z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="m14.22 7.22 3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 1 1-1.06-1.06l2.19-2.19-2.19-2.19a.75.75 0 1 1 1.06-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
