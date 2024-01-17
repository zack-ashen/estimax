import { InsertProperty, SelectProperty } from '@/db/schema/properties.schema';
import { Address, Project } from '.';

export const PropertyTypes = {
  SINGLE_FAMILY: 'Single Family',
  MULTI_FAMILY: 'Multi Family',
  APARTMENT: 'Apartment',
  CONDO: 'Condo',
  TOWNHOUSE: 'Townhouse',
  COMMERCIAL: 'Commercial',
  INDUSTRIAL: 'Industrial',
  OTHER: 'Other',
} as const;

export type Property = Omit<SelectProperty, 'address'> & {
  media: string[];
  projects: string[] | Project[];
  address: Address;
};

export type NewProperty = InsertProperty & {
  media: string[];
  address: string;
};
