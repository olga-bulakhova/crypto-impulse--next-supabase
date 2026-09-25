import React from 'react';
import { BaseLayout } from '@/widgets/BaseLayout';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BaseLayout>{children}</BaseLayout>;
}
