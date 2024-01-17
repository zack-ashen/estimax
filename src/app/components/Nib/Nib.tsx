import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const nibVariants = cva(
  'py-1 px-4 rounded-md text-xs font-medium cursor-default w-fit h-fit',
  {
    variants: {
      variant: {
        primary: 'bg-blue-200 text-blue-500',
        green:
          'bg-gradient-to-r from-green-200 to-green-200 dark:from-green-300 dark:to-green-300 text-green-500',
        yellow:
          'bg-gradient-to-r from-yellow-200 to-yellow-200 dark:from-yellow-300 dark:to-yellow-300 text-yellow-500',
        red: 'bg-gradient-to-r from-red-200 to-red-200 dark:from-red-300 dark:to-red-300 text-red-500',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

interface NibProps extends VariantProps<typeof nibVariants> {
  text: string;
}

export default function Nib({ text, variant }: NibProps) {
  return <div className={cn(nibVariants({ variant }))}>{text}</div>;
}
