import { InsertVendor, SelectVendor } from '@/db/schema/vendors.schema';
import { NewPlace, NewUser, User } from '.';

export type NewVendor = Omit<InsertVendor & NewUser, 'id' | 'place'> & {
  role: 'vendor';
  place: NewPlace;
  services: string[];
};
export type Vendor = SelectVendor &
  User & {
    role: 'vendor';
  };
