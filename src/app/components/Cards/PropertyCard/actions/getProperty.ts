'use server';

import organizationService from '@/services/organization.service';
import { auth } from '@clerk/nextjs/server';

export default async function getProperty(propertyId: string) {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error('Organization not found');
  }

  const orgUuid = await organizationService.convertCuidToId(orgId);

  const property = await organizationService.getProperty(propertyId, orgUuid);

  return property;
}
