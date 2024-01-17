'use server';

import organizationService from '@/services/organization.service';
import { Property } from '@/types';
import { auth } from '@clerk/nextjs/server';

const propertyCache = new Map<string, Property>();

export default async function getProperty(id: string): Promise<Property> {
  const cachedProperty = propertyCache.get(id);
  if (cachedProperty) {
    console.log('Using cached property');
    return cachedProperty;
  }

  const { orgId } = auth();
  if (!orgId) {
    throw Error('Organization not found');
  }
  const property = await organizationService.getProperty(orgId, id);

  propertyCache.set(id, property);

  return property;
}
