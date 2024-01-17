import db from '@/db';
import { properties } from '@/db/schema';
import { propertyMedia } from '@/db/schema/joinTables/propertyMedia.schema';
import { NewProperty, Property } from '@/types';
import locationService from './location.service';

const propertyService = {
  async create(newProperty: NewProperty): Promise<Property> {
    const address = await locationService.createAddress(newProperty.address);

    const [property] = await db
      .insert(properties)
      .values({ ...newProperty, address: address.id })
      .returning();

    const mediaObjs = newProperty.media.map((media) => ({
      propertyId: property.id,
      mediaId: media,
    }));

    if (mediaObjs.length) {
      await db.insert(propertyMedia).values(mediaObjs);
    }

    return { ...property, projects: [], address, media: newProperty.media };
  },

  async get(id: string) {},
};

export default propertyService;
