import { cn } from '@/lib/utils';
import React from 'react';

// Define the props interface
interface IconBubbleProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  size: 'sm' | 'md' | 'lg';
}

// IconBubble component
export default function IconBubble({ Icon, size }: IconBubbleProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-xl border bg-white',
        'border-grey-300',
        size === 'sm' && 'h-8 w-8',
        size === 'md' && 'h-11 w-11',
        size === 'lg' && 'h-16 w-16'
      )}
    >
      <Icon
        className={cn(
          size === 'sm' && 'h-4 w-4',
          size === 'md' && 'h-5 w-5',
          size === 'lg' && 'h-10 w-10'
        )}
      />
    </div>
  );
}
