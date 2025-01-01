'use client'

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import React, {useCallback, useEffect, useState} from "react";
import {Home} from "shared/models/home";
import {DateRange} from "react-day-picker";
import {differenceInDays} from "date-fns";
import {getSessionDateRange, getSessionGuests, setSessionDateRange, setSessionGuests} from "@/actions/sessionStorage";
import {DateRangePickerHome} from "@/components/home/date-range-picker-home";
import {GuestsSelectorHome} from "@/components/home/guests-selector-home";

export function BookingDetails({home}: { home: Home }) {

    const sessionDateRange: DateRange = getSessionDateRange()
    const [dateRange, setDate] = React.useState<DateRange>({
        from: sessionDateRange.from,
        to: sessionDateRange.to,
    })
    const onDateRangeChange = useCallback((_dateRange: DateRange) => {
        setDate(_dateRange)
        console.log(_dateRange)
        if (typeof window !== "undefined") {
            setSessionDateRange(_dateRange)
        }
    }, [])

    const sessionGuests: number = getSessionGuests()
    const [guests, setGuests] = useState<number>(sessionGuests)
    const onGuestsChange = useCallback((_guests: number) => {
        setGuests(_guests)
        if (typeof window !== "undefined") {
            setSessionGuests(_guests)
        }
    }, [])

    let totalNights: number
    try {
        totalNights = differenceInDays(dateRange.to, dateRange.from)
        if (isNaN(totalNights)) totalNights = 0
    } catch {
        totalNights = 0
    }

    const totalStayPrice: number = home.pricePerNight * totalNights;
    const nightPrice: number = home.pricePerNight * 0.90;
    const nightPriceTotal: number = totalStayPrice * 0.90;
    const cleaningFee: number = totalStayPrice * 0.03;
    const homelyFee: number = totalStayPrice * 0.07;

    const [canReserve, setCanReserve] = useState<boolean>(false)
    useEffect(() => {
        console.log(`Can reserve: ${canReserve}`)
        setCanReserve(totalNights > 0)
    }, [totalNights])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <p className="text-2xl font-medium">{`€ ${home.pricePerNight}`}<span
                            className="text-sm font-normal text-muted-foreground"> night</span>
                        </p>
                    </div>
                    <DateRangePickerHome dateRange={dateRange} onDateRangeChange={onDateRangeChange}/>
                    <GuestsSelectorHome guests={guests} maxGuests={home.maxGuests} onGuestsChange={onGuestsChange}/>
                    <div className="flex-col items-stretch">
                        <Button className="w-full" disabled={!canReserve}>
                            <Link
                                href={`/reservation/${home.id}`}
                                className={!canReserve ? 'disabled' : ''}
                                aria-disabled={!canReserve}
                                tabIndex={!canReserve ? -1 : undefined}
                            >
                                Reserve now
                            </Link>
                        </Button>
                    </div>
                    <div className="space-y-2 pt-4">
                        <div className="flex justify-between">
                            <span>{nightPrice.toFixed(2)} € x {totalNights} nights</span>
                            <span>{nightPriceTotal.toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Cleaning fee</span>
                            <span>{cleaningFee.toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Homely Service Fee</span>
                            <span>{homelyFee.toFixed(2)} €</span>
                        </div>
                    </div>

                    <Separator/>

                    <div className="flex justify-between font-semibold">
                        <span>Total (EUR)</span>
                        <span>{totalStayPrice} €</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}