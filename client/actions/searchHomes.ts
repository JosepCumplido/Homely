import {SearchRequest, SearchResponse} from "shared/data/searchRequest";
import {Home} from "shared/models/home";
import {Category} from "shared/models/category";

interface SearchHomesParams {
    isLoadMore: boolean;
    page: number;
    limit: number;
    searchCity: string | null;
    guestsNumber: number | undefined;
    searchCategory: Category | null;
    searchPriceRange: number[];
    selectedFeaturesList: string[];
    selectedAmenitiesList: string[];
    onSetSearchResultsNumber: (results: number) => void;
}

export async function searchHomes({isLoadMore, page, limit, searchCity, guestsNumber, searchCategory, searchPriceRange, selectedFeaturesList, selectedAmenitiesList, onSetSearchResultsNumber}: SearchHomesParams): Promise<{ homes: Home[], page: number, hasMore: boolean }> {
    try {
        const searchPage = isLoadMore ? page + 1 : 0;
        const request = new SearchRequest(searchPage, limit, searchCity, guestsNumber, searchCategory?.name ?? null, searchPriceRange, selectedFeaturesList, selectedAmenitiesList);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/search`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(request),
        });

        if (!response.ok) new Error('Network response failed');

        const searchResponse: SearchResponse = await response.json();
        onSetSearchResultsNumber(searchResponse.homes.length);

        return {
            homes: searchResponse.homes,
            page: searchPage,
            hasMore: searchResponse.hasMore,
        };
    } catch (error) {
        console.log(`Error searching homes. ${error}`)

        return {
            homes: [],
            page: 0,
            hasMore: false
        }
    }
}
