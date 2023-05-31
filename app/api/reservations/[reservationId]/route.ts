import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
    reservationId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid ID');
    }

    /* We want to ensure that only the creater of the reservation OR the creator
     * of the listing can actually delete this reservation
     */
    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id }, // this is the person who made a reservation
                { listing: { userId: currentUser.id } } // this is the owner of the property
            ]
        }
    });

    return NextResponse.json(reservation);
}
