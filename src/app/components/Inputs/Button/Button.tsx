import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all input-focus gap-3',
  {
    variants: {
      variant: {
        primary:
          'bg-blue-500 border border-blue-600 text-white hover:brightness-90 active:brightness-70 active:shadow-sm',
        secondary:
          'border border-grey-200 bg-white hover:bg-grey-50 hover:border-grey-300 text-dark-grey active:bg-grey-100 active:shadow-sm',
        tertiary: 'hover:bg-grey-200',
        link: 'text-dark-grey underline-offset-4 hover:underline',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
      width: {
        default: 'w-auto',
        full: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, width, size, asChild = false, ...props }, ref) => {
    if (asChild) {
      return (
        <span
          className={cn(buttonVariants({ variant, size, width, className }))}
        >
          {props.children}
        </span>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, width, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
