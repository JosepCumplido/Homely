"use client"

import {ArrowLeft, Star} from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import React, {useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Separator} from "@/components/ui/separator"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {DateRange} from "react-day-picker";
import {differenceInDays} from "date-fns";
import {AddReservationRequest} from "shared/data/reservationsRequest";
import {z} from "zod";
import {useAuth} from "@/context/authContext";
import {notFound, useRouter} from "next/navigation";
import {getSessionDateRange} from "@/actions/sessionStorage";
import {useFetchHome} from "@/hooks/useFetchHome";
import {calculatePrices} from "@/utils/priceCalculations";
import {ReservationSummary} from "@/app/(pages)/reservation/[id]/ReservationSummary";
import {PaymentForm} from "@/app/(pages)/reservation/[id]/PaymentForm";
import {PaymentMethodSelector} from "@/app/(pages)/reservation/[id]/PaymentMethodSelector";
import {BookingSummary} from "@/app/(pages)/reservation/[id]/BookinSummary";
import {useReservation} from "@/hooks/useReservation";

export default function BookingForm({params}: { params: { id: string } }) {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const {home, isLoadingHome, homeError} = useFetchHome(params.id)
    const { createReservation, isCreatingReservation, reservationError } = useReservation()

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    if (homeError) return <p>Error: {homeError.message}</p>

    if (isLoadingHome) {
        // TODO Page Skeleton
        return <p>Loading...</p>
    }

    if (!home) notFound()

    const sessionDateRange: DateRange = getSessionDateRange()
    const fromDate: Date = new Date(sessionDateRange.from)
    const toDate: Date = new Date(sessionDateRange.to)

    const fromDateString = fromDate.toLocaleDateString("es-ES");
    const toDateString = toDate.toLocaleDateString("es-ES");

    const guests: number = parseInt(sessionStorage.getItem("guests"))

    const prices = calculatePrices(home.pricePerNight, fromDate, toDate)

    const handleCreateReservation = async () => {
        const request: AddReservationRequest = {
            username: user.username,
            homeId: home.id,
            fromDate: fromDate,
            toDate: toDate,
            guests: guests,
            totalPrice: prices.totalStayPrice,
        }

        const success = await createReservation(request)

        if (success) {
            alert("Reservation created successfully!")
            router.push('/')
        } else {
            alert(reservationError || "Failed to create reservation")
        }
    };

    return (
        <div className="pb-24 h-full container mx-auto pt-6 overflow-y-scroll">
            <div className="mb-6">
                <Link href={`/home/${home.id}`} className="inline-flex items-center text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Go back to details
                </Link>
            </div>

            <div className="grid gap-16 md:grid-cols-5">
                <div className="md:col-span-3">
                    <ReservationSummary
                        fromDate={fromDateString}
                        toDate={toDateString}
                        guests={guests}
                    />
                    <PaymentMethodSelector/>
                    <PaymentForm onSubmit={handleCreateReservation} isCreatingReservation={isCreatingReservation} />
                    {reservationError && <p className="text-red-500 mt-4">{reservationError}</p>}

                </div>

                <div className="md:col-span-2">
                    <BookingSummary home={home} prices={prices}/>
                </div>
            </div>
        </div>
    )
}
