import * as React from "react"
import {CalendarIcon} from "@radix-ui/react-icons"
import {addDays, format} from "date-fns"
import {DateRange} from "react-day-picker"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function DateRangePickerHome({dateRange, onDateRangeChange}: { dateRange: DateRange, onDateRangeChange: (dateRange: DateRange) => void }) {
    return (
        <div>
            <div className={"grid gap-2 mb-1"}>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"default"}
                            className={"w-full text-black justify-start text-left font-normal h-6 !bg-transparent py-4 border-black border-1 rounded-lg overflow-hidden"}
                        >
                            <CalendarIcon color={"black"}/>
                            {dateRange?.from ? (
                                dateRange.to ? (
                                    <span className={"overflow-hidden text-ellipsis"}>
                                        {format(dateRange.from, "LLL dd, y")} -{" "}
                                        {format(dateRange.to, "LLL dd, y")}
                                    </span>
                                ) : (
                                    <span className={"overflow-hidden text-ellipsis"}> {format(dateRange.from, "LLL dd, y")} </span>
                                )
                            ) : (
                                <span className={"overflow-hidden text-ellipsis text-muted-foreground"}>Select a date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={dateRange?.from}
                            selected={dateRange}
                            onSelect={onDateRangeChange}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}