import db from '@/db';
import { propertyManagers } from '@/db/schema/propertyManagers.schema';
import { InsertUser, users } from '@/db/schema/users.schema';
import { NewPropertyManager, PropertyManager } from '@/types';
import { eq } from 'drizzle-orm';

const propertyManagerService = {
  async create(propertyManager: NewPropertyManager): Promise<string> {
    const userInfo: InsertUser = propertyManager;

    const propertyManagerId = await db.transaction(async (tx) => {
      const [user] = await tx
        .insert(users)
        .values({ ...userInfo })
        .returning();
      const [{ insertId }] = await tx
        .insert(propertyManagers)
        .values({ ...propertyManager, id: user.id })
        .returning({ insertId: propertyManagers.id });

      return insertId;
    });

    return propertyManagerId;
  },

  async get(id: string): Promise<PropertyManager> {
    const rawPropertyManager = await db.query.propertyManagers.findFirst({
      where: eq(propertyManagers.id, id),
      with: {
        user: true,
      },
    });
    if (!rawPropertyManager) {
      throw new Error('Property Manager not found');
    }

    const { user, ...rawPM } = rawPropertyManager;

    const propertyManager = {
      ...rawPM,
      ...user,
      role: 'propertyManager',
    } as PropertyManager;

    return propertyManager;
  },
};

export default propertyManagerService;
