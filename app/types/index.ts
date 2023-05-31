import { Listing, Reservation, User } from '@prisma/client';

/**
 * NOTE:
 * This SafeUser is needed because without it, when we use the User type from Prisma,
 * then the User has to have createdAt, updatedAt and emailVerified as Date types,
 * but as we now know, Server component can only pass plain objects and not Date objects
 * to Client component. This is the reason why we needed to create SafeUser and modify
 * these fields and accordingly in here -> their types.
 */

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};

export type SafeListing = Omit<Listing, 'createdAt'> & {
    createdAt: string;
};

export type SafeReservation = Omit<Reservation, 'createdAt' | 'startDate' | 'endDate' | 'listing'> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing
}