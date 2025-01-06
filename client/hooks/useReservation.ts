import {AddReservationRequest, AddReservationResponse} from "shared/data/reservationsRequest";
import {useState} from "react";

async function createReservationAsync(request: AddReservationRequest): Promise<{success: boolean; message: string}> {
    try {
        console.log(`Request: ${JSON.stringify(request)}`)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });

        console.log(`Successfull ${JSON.stringify(response)}`);
        if (response.ok) {
            const result = await response.json();
            return({success: true, message: "Reservation created successfully!"})
        } else {
            const error = await response.json();
            return({success: false, message: `Error: ${error.message}`})
        }
    } catch (error) {
        console.error(`Error creating the reservation: ${error.message}`);
        return({success: false, message: "Failed to create reservation. Please try again later."})
    }
}

export function useReservation() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createReservation = async (request: AddReservationRequest) => {
        setIsLoading(true);
        setError(null);
        try {
            const { success, message } = await createReservationAsync(request);
            if (!success) setError(message)
            return success
        }
        catch (error) {
            setError('An unexpected error occurred.');
            return false
        }
        finally {
            setIsLoading(false);
        }
    }

    return { createReservation, isCreatingReservation: isLoading, reservationError: error }
}
