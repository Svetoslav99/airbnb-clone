import { getServerSession } from 'next-auth/next';

import { auhOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/app/libs/prismadb';

/**
 * NOTE:
 * In Nextjs 13 we have "actions".
 * Here we have direct communication with our db through our server component.
 */

export async function getSession() {
    return await getServerSession(auhOptions);
}

export default async function getCurrentUser() {
    try {
        // this is how we get our session in our server components
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if (!currentUser) {
            return null;
        }

        /** We need to modify the user that we pass because of this:
         * Only plain objects can be passed to Client Components from Server Components.
         * Date objects are not supported.
         */
        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        };
    } catch (e) {
        return null;
    }
}
