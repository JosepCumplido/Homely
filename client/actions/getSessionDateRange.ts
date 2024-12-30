import {DateRange} from "react-day-picker";
import {addDays} from "date-fns";

export function getSessionDateRange(): DateRange {
    const sessionDateRange = sessionStorage.getItem("dateRange")
    const defaultDateRange: DateRange = {
        from: addDays(new Date(), 7),
        to: addDays(new Date(), 10),
    }

    try{
        const parsedDateRange = JSON.parse(sessionDateRange)
        console.log(`Parsed date range: ${JSON.stringify(parsedDateRange)}`)
        return parsedDateRange
    } catch {
        return defaultDateRange
    }
}