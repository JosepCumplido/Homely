import {Pair} from "@/utils/types";
import LocationDropdown from "@/components/host/LocationDropdown";
import {Input} from "@/components/ui/input";
import React from "react";

interface MainInformationProps {
    city: string,
    country: string,
    onLocationChange: (value: Pair<string, string>) => void
}

export function MainInformation(props: MainInformationProps) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Main Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <LocationDropdown value={[props.country, props.city]} onValueChange={props.onLocationChange}/>
                <Input
                    type="number"
                    id="pricePerNight"
                    name="pricePerNight"
                    placeholder="Price per night"
                />
                <Input
                    type="number"
                    id="maxGuests"
                    name="maxGuests"
                    placeholder="Number of guests"
                />
            </div>
        </div>
    )
}