import { buttonVariants } from '@/app/components/Inputs/Button/Button';
import Nib from '@/app/components/Nib/Nib';
import TabBar from '@/app/components/TabBar/TabBar';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { LuAward, LuCoins, LuInfo, LuScale } from 'react-icons/lu';
import getProject from './actions/getProject';

interface ProjectLayoutProps extends PropsWithChildren {
  params: {
    id: string;
  };
}

export default async function ProjectLayout({
  params: { id },
  children,
}: ProjectLayoutProps) {
  const project = await getProject(id);

  return (
    <>
      <div className="flex flex-row justify-between">
        <div>
          <h3 className="SectionHeader">{project.name}</h3>
          <Link
            href={`/pm/properties/${project.property}`}
            className={'text-sm text-dark-grey hover:underline'}
          >
            Project
          </Link>
        </div>
        <Nib text={'blah blah placeholer'} />
      </div>

      <TabBar
        basePath={`/pm/projects/${id}`}
        items={[
          { label: 'Bid Manager', route: '/', Icon: <LuCoins /> },
          { label: 'Compare Bids', route: '/compare', Icon: <LuScale /> },
          { label: 'Details', route: '/details', Icon: <LuInfo /> },
        ]}
        actionButton={
          <Link
            href={`/pm/projects/${id}/award`}
            className={buttonVariants({ variant: 'primary' })}
          >
            Award Bid
            <LuAward />
          </Link>
        }
        className="mt-7"
      />
      <div className="mt-7">{children}</div>
    </>
  );
}
