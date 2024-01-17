import db from '@/db';
import { places } from '@/db/schema/places.schema';
import { InsertUser, users } from '@/db/schema/users.schema';
import { vendors } from '@/db/schema/vendors.schema';
import { NewVendor } from '@/types/vendor.types';

const vendorService = {
  async create(vendor: NewVendor): Promise<string> {
    const userInfo: InsertUser = vendor;

    const vendorId = await db.transaction(async (tx) => {
      const [user] = await tx
        .insert(users)
        .values({ ...userInfo })
        .returning();
      const [place] = await tx
        .insert(places)
        .values({ ...vendor.place })
        .returning();
      const [{ insertId }] = await tx
        .insert(vendors)
        .values({ ...vendor, id: user.id, place: place.id })
        .returning({ insertId: vendors.id });

      return insertId;
    });

    return vendorId;
  },
};

export default vendorService;
