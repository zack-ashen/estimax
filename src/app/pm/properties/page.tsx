import PropertyCard from '@/app/components/Cards/PropertyCard/PropertyCard';
import Divider from '@/app/components/Divider/Divider';
import { buttonVariants } from '@/app/components/Inputs/Button/Button';
import organizationService from '@/services/organization.service';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa6';

export default async function PropertiesPage() {
  const { orgId } = auth();
  if (!orgId) {
    return null;
  }

  const properties = await organizationService.getProperties(orgId);

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h3 className="SectionHeader">Properties</h3>
        <Link
          className={buttonVariants({ variant: 'primary' })}
          href="/pm/properties/create"
        >
          Add Property
          <FaPlus />
        </Link>
      </div>
      <Divider className="mb-10 mt-5" />
      <div className="grid w-full auto-cols-max grid-flow-col gap-10">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </>
  );
}
