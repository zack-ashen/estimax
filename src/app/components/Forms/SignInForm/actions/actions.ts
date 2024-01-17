'use server';

import organizationService from '@/services/organization.service';
import propertyManagerService from '@/services/propertyManager.service';
import userService from '@/services/user.service';
import { Role } from '@/types';

export async function getOrganizationId(
  email: string
): Promise<string | undefined> {
  // TODO: replace with single query
  const user = await userService.getByEmail(email);

  if (user.role === Role.VENDOR) {
    return undefined;
  }

  const { organization } = await propertyManagerService.get(user.id);
  const { cuid } = await organizationService.get(organization);

  return cuid;
}
