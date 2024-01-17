import { InsertUser, SelectUser } from '@/db/schema/users.schema';

export enum Role {
  VENDOR = 'vendor',
  PROPERTY_MANAGER = 'propertyManager',
}

export type User = SelectUser;
export type NewUser = InsertUser;
