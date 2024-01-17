'use client';

import { DotFilledIcon } from '@radix-ui/react-icons';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from '../Label/Label';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square h-4 w-4 rounded-md border border-medium-grey text-dark-grey focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500  focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <DotFilledIcon className="h-3.5 w-3.5 fill-blue-400" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

interface CardRadioGroupProps {
  options: { value: string; label: string; Icon?: JSX.Element }[];
  value: string;
  onChange: (value: string) => void;
}

// const radioGroupVariants = cva(
//     "p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
//     {
//         status: {
//             active: "bg-blue-50 border-blue-500",
//             inactive: "bg-white border-gray-300",
//         },
//     }
// )

const CardRadioGroup = React.forwardRef<HTMLDivElement, CardRadioGroupProps>(
  ({ options, value, onChange }, ref) => {
    return (
      <RadioGroup value={value} onValueChange={onChange}>
        {options.map((option) => (
          <RadioGroupPrimitive.Item
            key={option.value}
            value={option.value}
            className={cn(
              'input-focus cursor-pointer rounded-lg border border-grey-300 p-3 hover:border-blue-500',
              option.value === value
                ? 'border border-blue-400 bg-blue-100'
                : 'bg-white'
            )}
            aria-labelledby={`radio-${option.value}`}
          >
            <div className="flex flex-col items-start">
              <Label
                id={`radio-${option.value}`}
                className="flex cursor-pointer flex-row items-center justify-items-center gap-2 text-sm font-medium"
              >
                {option.Icon && option.Icon}
                {option.label}
              </Label>
            </div>
          </RadioGroupPrimitive.Item>
        ))}
      </RadioGroup>
    );
  }
);

CardRadioGroup.displayName = 'CardRadioGroup';

export default CardRadioGroup;

export { CardRadioGroup, RadioGroup, RadioGroupItem };
