import {Home} from "../models/home";

export class HomeRequest {
    constructor(
        public hostUsername: string,
        public city: string,
        public country: string,
        public imagesUrls: string[],
        public pricePerNight: string,
        public features: string,
        public amenities: string,
        public categories: string,
        public maxGuests: string,
    ) {}
}

export class HomeResponse {
    constructor(
        public home: Home | null
    ) {}
}