'use server';

import organizationService from '@/services/organization.service';
import projectService from '@/services/project.service';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { CreateProjectSchema } from './../CreateProjectForm';

async function submit(
  formData: Omit<CreateProjectSchema, 'media'> & { media: string[] }
) {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error('Organization not found');
  }

  const orgUuid = await organizationService.convertCuidToId(orgId);

  const parsedData = {
    ...formData,
    allowDynamicBidding: formData.dynamicBidding === 'allowed',
    isPublic: formData.privacy === 'public',
  };

  const project = await projectService.create({
    ...parsedData,
    property: parsedData.property.value,
    organization: orgUuid,
  });

  redirect(`/pm/projects/${project.id}`);
}

export default submit;
