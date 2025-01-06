import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import Link from "next/link";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React from "react";

interface PaymentFormProps {
    onSubmit: (formData: FormData) => void,
    isCreatingReservation: boolean
}

export function PaymentForm(props: PaymentFormProps) {
    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget);
            props.onSubmit(formData)
        }}>
            <div>
                <h2 className="text-xl font-semibold mb-4">Payment method</h2>
                <div className="space-y-4">
                    <Select defaultValue="credit">
                        <SelectTrigger>
                            <SelectValue placeholder="Payment method"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="credit">Credit or debit card</SelectItem>
                        </SelectContent>
                    </Select>

                    <Input placeholder="Card number"/>

                    <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="Expiration date"/>
                        <Input placeholder="CVV"/>
                    </div>

                    <Input placeholder="Postal code"/>

                    <Select defaultValue="ES">
                        <SelectTrigger>
                            <SelectValue placeholder="Country/Region"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ES">Spain</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button type="submit" className="w-full mt-4">
                        {(props.isCreatingReservation) ? ('Creating reservation...') : ('Finish reservation')}
                    </Button>
                </div>
            </div>
        </form>
    )
}