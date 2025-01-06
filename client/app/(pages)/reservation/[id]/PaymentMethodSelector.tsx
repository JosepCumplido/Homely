import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import Link from "next/link";
import React from "react";

export function PaymentMethodSelector() {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Chose your payment method</h2>
            <RadioGroup defaultValue="full">
                <div className="flex items-center space-x-2 p-4 border rounded-lg mb-2">
                    <RadioGroupItem value="full" id="full"/>
                    <label htmlFor="full" className="flex-1">
                        <p className="font-medium">Pay € now</p>
                    </label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="installments" id="installments"/>
                    <label htmlFor="installments" className="flex-1">
                        <p className="font-medium">Divide payment in 3 months</p>
                        <p className="text-sm text-gray-600">
                            Pay in 3 instalments of € without interest (0% APR).{" "}
                            <Link href="#" className="underline">
                                More information
                            </Link>
                        </p>
                    </label>
                </div>
            </RadioGroup>
        </div>
    )
}