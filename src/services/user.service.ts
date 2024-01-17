import db from '@/db';
import { users } from '@/db/schema';
import { User } from '@/types';
import { eq } from 'drizzle-orm';

export const userService = {
  async getByEmail(email: string): Promise<User> {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  },
};

export default userService;
