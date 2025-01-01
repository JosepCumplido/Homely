import { useState, useEffect } from 'react';
import { useFetchHome } from '@/hooks/useFetchHome';
import { useFetchUser } from '@/hooks/useFetchUser';
import { Home } from 'shared/models/home';
import { User } from 'shared/models/user';

interface HomeData {
    home: Home | null;
    hostUser: User | null;
    isLoading: boolean;
    error: Error | null;
}

export function useHomeData(id: string): HomeData {
    const { home, isLoadingHome } = useFetchHome(id);
    const [hostUser, setHostUser] = useState<User | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (home?.hostUsername) {
            setIsLoadingUser(true);
            useFetchUser(home.hostUsername)
                .then(async (response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }
                    const userData = await response.json();
                    setHostUser(userData);
                })
                .catch((err) => setError(err))
                .finally(() => setIsLoadingUser(false));
        }
    }, [home]);

    return {
        home,
        hostUser,
        isLoading: isLoadingHome || isLoadingUser,
        error,
    };
}