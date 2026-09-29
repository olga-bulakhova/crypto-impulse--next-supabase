import React from 'react';
import { Button } from '@/shared/ui/Button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/kit/drawer';
import { CyberHeading } from '../CyberHeading';

interface ResponsiveSidebarProps {
  trigger: React.ReactElement;
  title: string;
  description?: string;
  children: React.ReactNode;
  footerActions?: React.ReactNode;
}

export const ResponsiveSidebar = ({
  trigger,
  title,
  description,
  children,
  footerActions,
}: ResponsiveSidebarProps) => {
  return (
    <Drawer swipeDirection="right" modal={true}>
      <DrawerTrigger render={trigger} />

      <DrawerContent className="w-full md:w-[500px]">
        <div className="mb-4 border-b border-zinc-900/60 pb-4">
          <DrawerTitle
            render={
              <CyberHeading as="h2" className="py-4">
                {title}
              </CyberHeading>
            }
          />
          {description && (
            <DrawerDescription className="">
              <span className="tracking-wid text-xs text-zinc-400">
                {description}
              </span>
            </DrawerDescription>
          )}
        </div>

        <div className="flex-1 py-2">{children}</div>

        <div className="mt-auto flex items-center justify-end gap-3 border-t border-zinc-900/60 pt-4">
          {footerActions}

          <DrawerClose
            render={
              <Button variant="base" size="sm">
                Закрыть
              </Button>
            }
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
