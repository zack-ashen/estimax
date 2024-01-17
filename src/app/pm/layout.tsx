'use client';

import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import NavBar from '../components/NavBar/NavBar';
import PMSidebar from '../components/Sidebar/PMSidebar/PMSidebar';

export default function PropertyManagerLayout({ children }: PropsWithChildren) {
  const path = usePathname();

  const pageTitles: { [k: string]: string } = {
    '/pm/properties/create': 'Create Property',
    '/pm/projects/create': 'Create Project',
  };

  return (
    <div className="row flex h-screen w-screen bg-grey-25">
      <PMSidebar />
      <div className="relative h-full w-full flex-1">
        <NavBar
          leftChild={
            <p className="font-medium">
              {pageTitles[path] && pageTitles[path]}
            </p>
          }
          rightChild={<>Right Section</>}
        />
        <main className="p-10">{children}</main>
      </div>
    </div>
  );
}
