'use server';

import organizationService from '@/services/organization.service';
import { auth } from '@clerk/nextjs/server';

async function getProperties() {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error('No org ID');
  }

  const properties = await organizationService.getProperties(orgId);
  return properties.map((property) => {
    return {
      label: property.name,
      value: property.id,
    };
  });
}

export default getProperties;
