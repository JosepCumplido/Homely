'use client'

export const useFetchUser = (username: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${username}`, {cache: 'no-store'})
}