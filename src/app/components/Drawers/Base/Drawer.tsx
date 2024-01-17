'use client';

import { cn } from '@/lib/utils';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';

// Drawer Root
interface DrawerProps
  extends React.ComponentProps<typeof DialogPrimitive.Root> {}

const Drawer: React.FC<DrawerProps> = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenChange = React.useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  return (
    <DialogPrimitive.Root {...props} onOpenChange={handleOpenChange}>
      {children}
    </DialogPrimitive.Root>
  );
};
Drawer.displayName = 'Drawer';

// Drawer Content
interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  drawerPosition?: 'side' | 'bottom';
}

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ children, drawerPosition = 'side', className, ...props }, ref) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn('fixed inset-0 z-50 h-full w-full bg-black/20')}
      />

      <DialogPrimitive.Content {...props}>
        <AnimatePresence>
          <motion.div
            initial={{ x: drawerPosition === 'side' ? '100%' : 0 }}
            animate={{ x: 0 }}
            exit={{ x: drawerPosition === 'side' ? '100%' : 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'fixed z-50 flex h-auto flex-col border-grey-300 bg-white shadow-lg',
              {
                'inset-y-0 right-0': drawerPosition === 'side',
                'inset-x-0 bottom-0 mt-24 flex-col':
                  drawerPosition === 'bottom',
              },
              className
            )}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);

DrawerContent.displayName = 'DrawerContent';

interface DrawerTriggerProps {
  children: React.ReactNode;
}

const DrawerTrigger: React.FC<DrawerTriggerProps> = ({ children }) => {
  return <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>;
};

export { Drawer, DrawerContent, DrawerTrigger };
