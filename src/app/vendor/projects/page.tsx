import { buttonVariants } from '@/app/components/Inputs/Button/Button';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/app/components/Toggles/Base/ToggleGroup';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { LuSearch } from 'react-icons/lu';

export default function ProjectsPage() {
  return (
    <>
      <div className="mb-7 flex w-full flex-row justify-between">
        <p className="SectionHeader">Projects</p>
        <Link
          href="/vendor/projects/find"
          className={cn(buttonVariants({ variant: 'secondary' }))}
        >
          Find Projects
          <LuSearch />
        </Link>
      </div>
      <ToggleGroup type="single">
        <ToggleGroupItem value="a">Active</ToggleGroupItem>
        <ToggleGroupItem value="b">Bookmarked</ToggleGroupItem>
        <ToggleGroupItem value="c">Invited</ToggleGroupItem>
      </ToggleGroup>
    </>
  );
}
