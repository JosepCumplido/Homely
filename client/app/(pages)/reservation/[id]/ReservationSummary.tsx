import {Button} from "@/components/ui/button";
import React from "react";

interface ReservationSummaryProps {
    fromDate: string,
    toDate: string,
    guests: number,
}

export function ReservationSummary(props: ReservationSummaryProps) {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Your reservation</h2>
            <div className="grid gap-4">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-bold">Dates</p>
                        <p className="text-sm text-gray-600">{props.fromDate} - {props.toDate}</p>
                    </div>
                    <Button variant="outline" size="sm" className={"cursor-not-allowed"}>
                        Edit
                    </Button>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-bold">Guests</p>
                        <p className="text-sm text-gray-600">{props.guests} guests</p>
                    </div>
                    <Button variant="outline" size="sm" className={"cursor-not-allowed"}>
                        Edit
                    </Button>
                </div>
            </div>
        </div>
    )
}