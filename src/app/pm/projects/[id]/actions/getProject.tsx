'use server';

import organizationService from '@/services/organization.service';
import { Project } from '@/types';
import { auth } from '@clerk/nextjs/server';

const projectCache = new Map<string, Project>();

async function getProject(id: string) {
  const cachedProperty = projectCache.get(id);
  if (cachedProperty) {
    console.log('Using cached project');
    return cachedProperty;
  }

  const { orgId } = auth();
  if (!orgId) {
    throw Error('Organization not found');
  }

  const project = await organizationService.getProject(orgId, id);

  projectCache.set(id, project);

  return project;
}

export default getProject;
