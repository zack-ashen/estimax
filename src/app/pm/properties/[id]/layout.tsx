import { buttonVariants } from '@/app/components/Inputs/Button/Button';
import Nib from '@/app/components/Nib/Nib';
import TabBar from '@/app/components/TabBar/TabBar';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { LuHammer, LuHistory, LuInfo, LuWand2 } from 'react-icons/lu';
import getProperty from './actions/getProperty';

interface PropertyLayoutProps extends PropsWithChildren {
  params: {
    id: string;
  };
}

export default async function PropertyLayout({
  params: { id },
  children,
}: PropertyLayoutProps) {
  const property = await getProperty(id);

  return (
    <>
      <div className="flex flex-row justify-between">
        <div>
          <h3 className="SectionHeader">{property.name}</h3>
          <div className="text-sm text-medium-grey">
            <p>{property.address.addressLine1}</p>
            <p>
              {property.address.city}, {property.address.state}
            </p>
          </div>
        </div>
        <Nib text={property.type} />
      </div>

      <TabBar
        basePath={`/pm/properties/${id}`}
        items={[
          { label: 'Projects', route: '/', Icon: <LuHammer /> },
          { label: 'History', route: '/history', Icon: <LuHistory /> },
          { label: 'Analytics', route: '/analytics', Icon: <LuWand2 /> },
          { label: 'Details', route: '/details', Icon: <LuInfo /> },
        ]}
        actionButton={
          <Link
            href={`/pm/projects/create/?property=${id}`}
            className={buttonVariants({ variant: 'primary' })}
          >
            Add Project
            <FaPlus />
          </Link>
        }
        className="mt-7"
      />
      <div className="mt-7">{children}</div>
    </>
  );
}
