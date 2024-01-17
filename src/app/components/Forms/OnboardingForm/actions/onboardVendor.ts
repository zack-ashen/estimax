'use server';

import locationService from '@/services/location.service';
import vendorService from '@/services/vendor.service';
import { Role } from '@/types';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { OnboardingSchema } from '../OnboardingForm';

async function onboardVendor(data: OnboardingSchema) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  if (data.role !== 'vendor') {
    throw new Error('Wrong role');
  }

  const { companyName, location, phoneNumber, services } = data;
  const { firstName, lastName, emailAddresses } =
    await clerkClient.users.getUser(userId);

  const place = await locationService.parsePlace(location.value);

  await vendorService.create({
    cuid: userId,
    firstName: firstName || '',
    lastName: lastName || '',
    email: emailAddresses[0].emailAddress,
    phoneNumber: phoneNumber,
    role: Role.VENDOR,
    companyName,
    place,
    services,
  });

  await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      role: 'vendor',
      onboarding: 'complete',
    },
  });

  return { cuid: userId };
}

export default onboardVendor;
