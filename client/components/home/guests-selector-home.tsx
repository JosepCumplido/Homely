import {Button, Group, Input, NumberField} from "react-aria-components";
import {Minus, Plus} from "lucide-react";
import {useCallback, useState} from "react";

export function GuestsSelectorHome({maxGuests}: { maxGuests: number }) {
    const [guests, setGuests] = useState<number>(2)
    const onGuestsChange = useCallback((guests: number) => {
        setGuests(guests)
        if (typeof window !== "undefined") {
            sessionStorage.setItem("guests", JSON.stringify(guests))
        }
    }, [])

    return (
        <div className={"space-y-1"}>
            <NumberField value={guests} minValue={1} maxValue={maxGuests} onChange={onGuestsChange}>
                <div className="space-y-2">
                    <Group
                        className="border-black border-1 flex flex-row space-x-2 px-4 h-9 w-full items-center whitespace-nowrap rounded-lg text-sm shadow-sm shadow-black/5 transition-shadow">
                        <Button
                            aria-label="Decrease hosts"
                            slot="decrement"
                            className="flex aspect-square h-6 items-center justify-center rounded-full border border-input bg-background text-sm text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Minus size={16} strokeWidth={2} aria-label="Decrease hosts"/>
                        </Button>
                        <div className={"flex text-center"}>
                            <Input
                                aria-label="Guests input"
                                placeholder="Add guests"
                                className="bg-transparent tabular-nums text-black focus:outline-none"
                            />
                            <span> {(guests == 1) ? 'guest' : 'guests'} </span>
                        </div>
                        <Button
                            aria-label="Increase hosts"
                            slot="increment"
                            className="flex aspect-square h-6 items-center justify-center rounded-full border border-input bg-background text-sm text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Plus size={16} strokeWidth={2} aria-label="Increase hosts"/>
                        </Button>
                    </Group>
                </div>
            </NumberField>
            <p className={"text-accent-foreground text-sm"}>Maxim house guests: {maxGuests}</p>
        </div>
    );
}