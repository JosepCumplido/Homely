'use client'
import {ImagesMosaic} from "@/app/(pages)/home/[id]/ImagesMosaic";
import {BookingDetails} from "@/app/(pages)/home/[id]/BookingDetails";
import {notFound} from "next/navigation";
import {useHomeData} from "@/hooks/useHomeData";
import {HomeHeader} from "@/app/(pages)/home/[id]/HomeHeader";
import {HostInfo} from "@/app/(pages)/home/[id]/HostInfo";
import {HomeDescription} from "@/app/(pages)/home/[id]/HomeDescription";

export default function HomePage({params}: { params: { id: string } }) {
    const {home, hostUser, isLoading, error} = useHomeData(params.id)

    if (error) {
        return <p>Error: {error.message}</p>
    }

    if (isLoading) {
        // Page Skeleton
        return <p>Loading...</p>
    }

    if (!home) {
        notFound()
    }

    return (
        <div className="py-8 space-y-6">
            <HomeHeader home={home}/>
            <ImagesMosaic imageUrls={home.imagesUrls}/>

            <div className="grid grid-cols-1 md:grid-cols-5 xl:grid-cols-3 gap-10">
                <div className="md:col-span-3 xl:col-span-2 space-y-8">
                    <div>
                        <p className="text-xl font-semibold">Entire rental unit in {home.city}, {home.country} </p>
                        <p>{home.maxGuests} guests · 2 bedrooms · 3 beds · 2 baths</p>
                    </div>
                    <HostInfo hostUser={hostUser}/>
                    <HomeDescription home={home}/>
                </div>
                <div className="md:col-span-2 xl:col-span-1">
                    <BookingDetails home={home}/>
                </div>
            </div>
        </div>
    );
}