import {
  InsertOrganization,
  SelectOrganization,
} from '@/db/schema/organization.schema';

export type Organization = SelectOrganization;
export type NewOrganization = Omit<InsertOrganization, 'cuid'>;
