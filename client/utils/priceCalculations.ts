import { differenceInDays } from "date-fns";

export type ReservationPrices = {
    totalNights: number;
    nightPrice: number;
    nightPriceTotal: number;
    cleaningFee: number;
    homelyFee: number;
    totalStayPrice: number;
}

export function calculatePrices(pricePerNight: number, fromDate: Date, toDate: Date): ReservationPrices {
    const totalNights = differenceInDays(toDate, fromDate) || 0;
    const totalStayPrice = pricePerNight * totalNights;
    const nightPrice = pricePerNight * 0.90;
    const nightPriceTotal = totalStayPrice * 0.90;
    const cleaningFee = totalStayPrice * 0.03;
    const homelyFee = totalStayPrice * 0.07;

    return {
        totalNights,
        totalStayPrice,
        nightPrice,
        nightPriceTotal,
        cleaningFee,
        homelyFee
    };
}