'use server';

import organizationService from '@/services/organization.service';
import { auth } from '@clerk/nextjs/server';

export default async function getProject(projectId: string) {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error('Organization not found');
  }

  const orgUuid = await organizationService.convertCuidToId(orgId);

  const project = await organizationService.getProject(projectId, orgUuid);

  return project;
}
