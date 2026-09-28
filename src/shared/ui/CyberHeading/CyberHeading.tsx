import React from 'react';

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface CyberHeadingProps {
  as?: HeadingTag;
  children: React.ReactNode;
  className?: string;
}

export const CyberHeading = ({
  as: Tag = 'h3',
  children,
  className = '',
}: CyberHeadingProps) => {
  return (
    <Tag
      className={`text-sm font-extrabold tracking-wider text-zinc-400 uppercase select-none ${className}`}
    >
      {children}
    </Tag>
  );
};
