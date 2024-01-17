import { Property } from '@/types';
import Nib from '../../Nib/Nib';
import { Card } from '../Base';
import getProperty from './actions/getProperty';

type PropertyCardProps =
  | {
      id: string;
      property?: never;
    }
  | {
      id?: never;
      property: Property;
    };

export default async function PropertyCard({
  id,
  property,
}: PropertyCardProps) {
  if (id) {
    property = await getProperty(id);
  }

  return property ? (
    <Card
      className="flex w-[22rem] flex-row items-start justify-between p-5"
      navigateTo={`/pm/properties/${property.id}`}
      clickable
    >
      <div>
        <p className="mb-1 font-semibold">{property.name}</p>
        <p className="text-xs text-medium-grey">
          {property.address.addressLine1}
        </p>
        <p className="text-xs text-medium-grey">
          {property.address.city}, {property.address.state}{' '}
          {property.address.zip}
        </p>
      </div>
      <div>
        <Nib text={`${property.projects.length} Projects`} />
      </div>
    </Card>
  ) : (
    <>Loading</>
  );
}
