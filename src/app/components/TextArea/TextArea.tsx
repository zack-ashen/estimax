import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const textAreaVariants = cva(
  'flex min-h-[60px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm placeholder:text-light-grey focus:border focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      error: {
        true: 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400',
      },
      valid: {
        true: 'border-green-500 focus:outline-none ring-2 ring-green-300 border-success focus:ring-2 focus:ring-green-300 focus:border-success',
      },
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  valid?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, valid, ...props }, ref) => {
    if (valid && error) {
      valid = false;
    }

    return (
      <textarea
        className={cn(textAreaVariants({ error, valid, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
TextArea.displayName = 'TextArea';

export { TextArea };
