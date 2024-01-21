import { Button } from '@/app/components/Inputs/Button/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/components/Popover/Popover';

export default function FindProjectsPage() {
  return (
    <>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
      </div>
    </>
  );
}
