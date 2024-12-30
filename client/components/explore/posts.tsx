import {PostCard} from "@/components/explore/postCard";
import {Home} from "shared/models/home";
import {Button} from "@/components/ui/button";
import {ReloadIcon} from "@radix-ui/react-icons";
import React, {useCallback, useEffect, useState} from "react";
import {SearchRequest} from "shared/data/searchRequest";
import {Category} from "shared/models/category";
import {PostsSkeleton} from "@/components/explore/postsSkeleton";
import {searchHomes} from "@/actions/searchHomes";

export function Posts({searchCity, guestsNumber, searchCategory, searchPriceRange, selectedFeaturesList, selectedAmenitiesList, onSetSearchResultsNumber}: {
    searchCity: string | null,
    guestsNumber: number | undefined,
    searchCategory: Category | null,
    searchPriceRange: number[],
    selectedFeaturesList: string[],
    selectedAmenitiesList: string[],
    onSetSearchResultsNumber: (results: number) => void,
}) {
    const [homes, setHomes] = useState<Home[]>([])
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    const limit = 10
    const handleSearchHomes = useCallback(async (isLoadMore: boolean = false) => {
        setIsLoading(true);
        try {
            const {homes: newHomes, page: newPage, hasMore} = await searchHomes({isLoadMore, page, limit, searchCity, guestsNumber, searchCategory, searchPriceRange, selectedFeaturesList, selectedAmenitiesList, onSetSearchResultsNumber});
            setHomes(prevHomes => (isLoadMore ? [...prevHomes, ...newHomes] : newHomes));
            setPage(newPage);
            setHasMore(hasMore);
        } catch (error) {
            console.error("Error al cercar cases:", error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }, [page, searchCity, guestsNumber, searchCategory, searchPriceRange, selectedFeaturesList, selectedAmenitiesList]);

    // Funció per executar la cerca quan els filtres canvien
    useEffect(() => {
        // Si canvia algun filtre, torna a cercar des de la pàgina 0 sense `isLoadMore`
        handleSearchHomes(false);
    }, [searchCity, guestsNumber, searchCategory, searchPriceRange, selectedFeaturesList, selectedAmenitiesList]);

    // Funció per executar la cerca quan es vol mostrar mes contingut amb els mateixos filtres
    const loadMore = () => handleSearchHomes(true);

    return (
        <div className="flex flex-col gap-8">
            {isLoading && (!homes || homes.length === 0) ? (
                // Si està carregant i no hi ha dades, mostra el skeleton
                <PostsSkeleton/>
            ) : (homes && homes.length > 0) ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 gap-6 py-6">
                        {homes.map((home, index) => (
                            <PostCard key={index} home={home}/>
                        ))}
                    </div>
                    {hasMore && (
                        <Button onClick={loadMore} className="m-auto py-[1.25rem]">
                            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>}
                            {isLoading ? "Loading" : "Load more"}
                        </Button>
                    )}
                </>
            ) : (
                <>
                    <div className="text-center font-bold pt-10">No posts found.</div>
                </>
            )}
        </div>
    )
}