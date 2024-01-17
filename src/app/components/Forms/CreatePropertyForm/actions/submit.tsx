'use server';

import organizationService from '@/services/organization.service';
import propertyService from '@/services/property.service';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { CreatePropertySchema } from '../CreatePropertyForm';

const submit = async (
  data: Omit<CreatePropertySchema, 'media'> & { media: string[] }
) => {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error('Organization not found');
  }

  const orgUuid = await organizationService.convertCuidToId(orgId);

  const parsedData = {
    ...data,
    type: data.type.value,
    address: data.address.value,
    organization: orgUuid,
  };

  console.log(data.media);

  const property = await propertyService.create(parsedData);

  redirect(`/pm/properties/${property.id}`);
};

export default submit;
