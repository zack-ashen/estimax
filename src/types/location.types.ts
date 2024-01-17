import { InsertAddress, SelectAddress } from '@/db/schema/addresses.schema';
import { InsertPlace, SelectPlace } from '@/db/schema/places.schema';

export type Place = SelectPlace;
export type NewPlace = InsertPlace;

export type Address = SelectAddress;
export type NewAddress = InsertAddress;
