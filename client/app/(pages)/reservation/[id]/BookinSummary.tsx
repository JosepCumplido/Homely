import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";
import {Star} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import React from "react";
import {Home} from "shared/models/home";
import {ReservationPrices} from "@/utils/priceCalculations";

interface BookinSummaryProps {
    home: Home,
    prices: ReservationPrices
}

export function BookingSummary(props: BookinSummaryProps) {
    return (
        <Card className="sticky top-4">
            <CardContent className="p-8">
                <div className="flex gap-4 mb-4">
                    {(props.home.imagesUrls.length > 0 && props.home.imagesUrls[0] != '') ? (
                        <Image
                            src={`/uploads/${props.home.imagesUrls[0]}`}
                            alt="Property"
                            width={540}
                            height={720}
                            className="rounded-lg object-cover w-28 h-28"
                        />
                    ) : (
                        <Image src={`/uploads/default_image.webp`} alt={"Card image"} width={540}
                               height={720}
                               className={"object-cover w-full h-full rounded-lg"} priority/>
                    )}

                    <div>
                        <h3 className="font-bold">{props.home.city}, {props.home.country}</h3>
                        <p>Entire rental unit</p>
                        <div className="flex w-full gap-1 text-sm">
                            <Star className="h-4 w-4 fill-current"/>
                            <span className="font-bold">{props.home.score ? (props.home.score) : ("New")}</span>
                        </div>
                    </div>
                </div>

                <Separator className="my-4"/>

                <div className="space-y-4">
                    <h3 className="font-semibold">Payment details</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>{props.prices.nightPrice.toFixed(2)} € x {props.prices.totalNights} nights</span>
                            <span>{props.prices.nightPriceTotal.toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Cleaning fee</span>
                            <span>{props.prices.cleaningFee.toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Homely Service Fee</span>
                            <span>{props.prices.homelyFee.toFixed(2)} €</span>
                        </div>
                    </div>

                    <Separator/>

                    <div className="flex justify-between font-semibold">
                        <span>Total (EUR)</span>
                        <span>{props.prices.totalStayPrice} €</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}