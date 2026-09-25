import React from 'react';
import { BaseLayout } from '@/widgets/BaseLayout';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BaseLayout>{children}</BaseLayout>;
}
