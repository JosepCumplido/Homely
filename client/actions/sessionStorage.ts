'use client'
import {DateRange} from "react-day-picker";
import {addDays} from "date-fns";

// Date range
const sessionDateRangeName = "dateRange"
const defaultSessionDateRange: DateRange = {
    from: addDays(new Date(), 7),
    to: addDays(new Date(), 10),
}

export function getSessionDateRange(): DateRange {
    try {
        const sessionDateRange = sessionStorage.getItem(sessionDateRangeName)
        if (sessionDateRange == null) throw new Error("No date range in session")
        return JSON.parse(sessionDateRange)
    } catch {
        return defaultSessionDateRange
    }
}

export function setSessionDateRange(dateRange: DateRange) {
    sessionStorage.setItem(sessionDateRangeName, JSON.stringify(dateRange))
}

// Guests number
const sessionGuestsName = "guests"
const defaultSessionGuestsNumber = 2

export function getSessionGuests(): number {
    try {
        const guests = parseInt(sessionStorage.getItem(sessionGuestsName))
        if (isNaN(guests) || guests < 1) throw new Error("Invalid guests number")
        console.log("Guests: " + guests)
        return guests
    } catch {
        console.log("Default session number: " + defaultSessionGuestsNumber)
        return defaultSessionGuestsNumber
    }
}

export function setSessionGuests(guests: number) {
    sessionStorage.setItem(sessionGuestsName, JSON.stringify(guests))
}