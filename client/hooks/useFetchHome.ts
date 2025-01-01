'use client'
import {useEffect, useState} from "react";
import {Home} from 'shared/models/home'

export const useFetchHome = (id: string) => {
    const [home, setHome] = useState<Home>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/${id}`, {cache: 'no-store'})
            .then(async res => {
                setHome(await res.json())
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() =>
                setIsLoading(false)
            )
    }, [])

    return { home, isLoadingHome: isLoading }
}