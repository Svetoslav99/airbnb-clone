import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

import getListingById from "@/app/actions/getListingById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

interface IParams {
    listingId?: string;
}

/* 
* In server components we cannot access hooks, so we cannot access the router from next/navigation,
* we can use things like actions for direct communication with our DB.
* Thankfully, we can also access the params, so in our case - the URL listingId
*/
const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ListingClient
                listing={listing}
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ListingPage;