import {
  InsertPropertyManager,
  SelectPropertyManager,
} from '@/db/schema/propertyManagers.schema';
import { NewUser, User } from '.';

export type PropertyManager = SelectPropertyManager &
  User & {
    role: 'propertyManager';
  };
export type NewPropertyManager = Omit<InsertPropertyManager & NewUser, 'id'>;
