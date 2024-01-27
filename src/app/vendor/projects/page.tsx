import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/app/components/Toggles/Base/ToggleGroup';

export default function ProjectsPage() {
  return (
    <>
      <div className="mb-7 flex w-full flex-row justify-between">
        <p className="SectionHeader">Projects</p>
        <ToggleGroup type="multiple" defaultValue={['all']}>
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <div className="h-full w-[0.1rem] rounded-full bg-blue-200" />
          <ToggleGroupItem value="active">Active</ToggleGroupItem>
          <ToggleGroupItem value="bookmarked">Bookmarked</ToggleGroupItem>
          <ToggleGroupItem value="invited">Invited</ToggleGroupItem>
          <ToggleGroupItem value="bidded">Bidded</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex flex-row justify-start"></div>
    </>
  );
}
