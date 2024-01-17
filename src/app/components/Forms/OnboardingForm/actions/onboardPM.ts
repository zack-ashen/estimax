'use server';

import organizationService from '@/services/organization.service';
import propertyManagerService from '@/services/propertyManager.service';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { OnboardingSchema } from '../OnboardingForm';

async function onboardPM(data: OnboardingSchema) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const { companyName, phoneNumber } = data;
  const { firstName, lastName, emailAddresses } =
    await clerkClient.users.getUser(userId);

  // Create organization
  const { id, cuid } = await organizationService.create(
    {
      name: companyName,
    },
    userId
  );

  await propertyManagerService.create({
    cuid: userId,
    firstName: firstName || '',
    lastName: lastName || '',
    email: emailAddresses[0].emailAddress,
    phoneNumber: phoneNumber,
    role: 'propertyManager',
    organization: id,
  });

  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      role: 'propertyManager',
      onboarding: 'complete',
    },
  });

  return { cuid };
}

export default onboardPM;
