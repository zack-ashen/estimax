import { SettingsIcon } from '@/assets';
import { useState } from 'react';
import {
  LuBookmark,
  LuBuilding2,
  LuCreditCard,
  LuFile,
  LuLayoutDashboard,
} from 'react-icons/lu';

import { LuSearch } from 'react-icons/lu';

import {
  SidebarLink,
  SidebarSection,
  SidebarSectionProps,
} from '../Base/Sidebar';

const sidebarItems: SidebarSectionProps[] = [
  {
    name: 'General',
    items: [
      {
        name: 'Dashboard',
        path: '/pm',
        Icon: LuLayoutDashboard,
      },
      {
        name: 'Favorite Vendors',
        path: '/pm/vendors',
        Icon: LuBookmark,
      },
      {
        name: 'Find Vendors',
        path: '/pm/find-vendors',
        Icon: LuSearch,
      },
      {
        name: 'Properties',
        path: '/pm/properties',
        Icon: LuBuilding2,
      },
    ],
  },
  {
    name: 'Financials',
    items: [
      {
        name: 'Billing',
        path: '/pm/financials/billing',
        Icon: LuCreditCard,
      },
      {
        name: 'Documents',
        path: '/pm/financials/documents',
        Icon: LuFile,
      },
    ],
  },
];

export default function PMSidebar() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      <aside
        className="relative flex h-full w-72 min-w-72 flex-col border-r border-grey-200 bg-white"
        aria-label="Sidebar"
      >
        <div className="flex h-[3.75rem] grow-0 flex-row items-center border-b border-grey-200 px-6 py-3">
          <h3>Estimax</h3>
        </div>
        <div className="flex grow flex-col justify-between gap-4 px-3 py-5">
          <div className="flex flex-col gap-6">
            {sidebarItems.map((section, idx) => (
              <SidebarSection {...section} key={idx} />
            ))}
          </div>
          <div>
            <SidebarLink
              label="Settings"
              href="/pm/settings"
              Icon={SettingsIcon}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
