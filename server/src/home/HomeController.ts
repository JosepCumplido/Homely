import {Request, Response} from 'express';
import {HomeRepository} from './HomeRepository';
import {HomeRepositoryElastic} from "./HomeRepositoryElastic";
import {Home} from "shared/models/home";
import {Country} from "shared/models/country";
import {SearchRequest, SearchResponse} from 'shared/data/searchRequest';
import {HomeRequest, HomeResponse} from 'shared/data/homeRequest';

export class HomeController {
    private homeRepository: HomeRepository;
    private homeRepositoryElastic: HomeRepositoryElastic

    constructor(homeRepository: HomeRepository, homeRepositoryElastic: HomeRepositoryElastic) {
        this.homeRepository = homeRepository;
        this.homeRepositoryElastic = homeRepositoryElastic;
    }

    async getAllHomes(req: Request, res: Response): Promise<void> {
        try {
            const response = await this.homeRepositoryElastic.getAllHomes();
            res.json(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getHomeById(req: Request, res: Response): Promise<void> {
        try {
            const home = await this.homeRepository.findById(Number(req.params.id));
            if (home) {
                res.json(home);
            } else {
                res.status(404).send('Home not found');
            }
        } catch (err) {
            res.status(500).send('Error retrieving home');
        }
    }

    async createHome(req: Request, res: Response): Promise<void> {
        try {
            const newHome = req.body;
            await this.homeRepository.create(newHome);
            res.status(201).send('Home created');
        } catch (err) {
            res.status(500).send('Error creating home');
        }

        try {
            const response = await this.homeRepositoryElastic.createHome(req.body);
            res.json(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async updateHome(req: Request, res: Response): Promise<void> {
        const {index, id} = req.params;
        try {
            const response = await this.homeRepositoryElastic.updateHome(id, req.body);
            res.json(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async deleteHome(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        try {
            const response = await this.homeRepositoryElastic.deleteHome(id);
            res.json(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async bulkCreateHomes(req: Request, res: Response): Promise<any> {
        const europeanCountries: Country[] = [
            {
                name: "Spain",
                cities: ["Madrid", "Barcelona", "Valencia", "Seville", "Bilbao"],
            },
            {
                name: "France",
                cities: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice"],
            },
            {
                name: "Germany",
                cities: ["Berlin", "Hamburg", "Munich", "Frankfurt", "Cologne"],
            },
            {
                name: "Italy",
                cities: ["Rome", "Milan", "Naples", "Turin", "Florence"],
            },
            {
                name: "United Kingdom",
                cities: ["London", "Manchester", "Birmingham", "Liverpool", "Edinburgh"],
            },
            {
                name: "Portugal",
                cities: ["Lisbon", "Porto", "Braga", "Faro", "Coimbra"],
            },
            {
                name: "Netherlands",
                cities: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
            },
            {
                name: "Belgium",
                cities: ["Brussels", "Antwerp", "Ghent", "Bruges", "Leuven"],
            },
            {
                name: "Sweden",
                cities: ["Stockholm", "Gothenburg", "Malmö", "Uppsala", "Västerås"],
            },
            {
                name: "Norway",
                cities: ["Oslo", "Bergen", "Trondheim", "Stavanger", "Drammen"],
            },
            {
                name: "Denmark",
                cities: ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg"],
            },
            {
                name: "Austria",
                cities: ["Vienna", "Salzburg", "Innsbruck", "Graz", "Linz"],
            },
            {
                name: "Switzerland",
                cities: ["Zurich", "Geneva", "Basel", "Bern", "Lausanne"],
            },
            {
                name: "Poland",
                cities: ["Warsaw", "Kraków", "Łódź", "Wrocław", "Gdańsk"],
            },
            {
                name: "Greece",
                cities: ["Athens", "Thessaloniki", "Patras", "Heraklion", "Larissa"],
            },
        ];
        const categories = ["beach", "countryside", "city", "cabins", "boats", "castles", "skiing", "lake", "luxe", "mountain", "camping"]

        const featureTypes = [
            {
                label: "Kitchen",
                features: ["Oven", "Microwave", "Dishwasher", "Refrigerator", "Freezer", "Utensils and dishware", "Electric kettle", "Toaster", "Coffee machine"]
            },
            {
                label: "Bathroom",
                features: ["Hairdryer", "Shower", "Bathtub", "Towel warmer", "Towels included", "Accessible bathroom", "Bidet", "Toiletries"]
            },
            {label: "Bedroom", features: ["King-size bed", "Individual beds"]},
            {
                label: "Living areas",
                features: ["TV", "Dedicated workspace", "Hardwood flooring", "Carpet flooring", "Balcony", "Terrace", "Private garden"]
            },
        ];

        const amenityTypes = [
            {label: "Comfort", amenities: ["Air conditioning", "Heating", "Soundproofing", "Fireplace"]},
            {
                label: "Conveniences",
                amenities: ["Wi-Fi", "High-speed internet", "Satellite TV", "Washer", "Dryer", "Ironing board", "Vacuum and cleaning tools", "Private parking available", "Elevator"]
            },
            {
                label: "Security and safety",
                amenities: ["Reception or concierge", "Surveillance or cameras", "Alarm", "Smoke detector", "Monoxide detector", "Fire extinguisher", "First aid kit"]
            },
            {
                label: "Additional services",
                amenities: ["Gym", "Pool", "Spa or sauna", "BBQ area", "Meal service", "Green spaces", "Children's play area", "Crib"]
            },
        ];

        // Funció per generar un número aleatori entre dos valors
        function randomInt(min: number, max: number) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // Funció per seleccionar elements aleatoris d'una llista
        function randomSelection(array: string[], count: number) {
            const selected: string[] = [];
            while (selected.length < count) {
                const item = array[randomInt(0, array.length - 1)];
                if (!selected.includes(item)) selected.push(item);
            }
            return selected;
        }

        // Funció per generar un objecte aleatori `Home`
        function generateRandomHome(): Home {
            const countryIndex = randomInt(0, europeanCountries.length - 1);
            const country = europeanCountries[countryIndex];
            const city = europeanCountries[countryIndex].cities[randomInt(0, europeanCountries[countryIndex].cities.length - 1)];

            return {
                id: null,
                hostUsername: "josep",
                city: city,
                country: country.name,
                imagesUrls: ['post_1_1.webp', 'post_1_2.webp', 'post_1_3.webp', 'post_1_4.webp'],
                pricePerNight: randomInt(50, 500),
                score: parseFloat((Math.random() * 5).toFixed(1)),
                features: featureTypes.flatMap(ft => randomSelection(ft.features, randomInt(1, ft.features.length))),
                amenities: amenityTypes.flatMap(at => randomSelection(at.amenities, randomInt(1, at.amenities.length))),
                categories: randomSelection(categories, randomInt(1, 3)),
                maxGuests: randomInt(1, 16),
            } as Home;
        }

        const homesNumber = 30
        try {
            const homes: Home[] = []
            for (let i = 0; i < homesNumber; i++) {
                const home: Home = generateRandomHome();
                const insertedHome = await this.homeRepository.create(home)
                if (insertedHome) homes.push(insertedHome)
            }

            const response = await this.homeRepositoryElastic.populate(homes);
            return res.status(201).json(response);
        } catch (error) {
            return res.status(500).send('Error creating homes in bulk' + error);
        }
    }

    // end create bulk homes

    async searchHomes(req: any, res: any): Promise<any> {
        const defaultSize = 1000
        try {
            const request = req.body as SearchRequest
            const page: number = request.page
            const size: number | null = request.size
            const city: string | null = request.city
            const guestsNumber: number | undefined = request.guestsNumber
            const category: string | null = request.category
            const priceRange: number[] = request.priceRange
            const featuresList: string[] = request.featuresList
            const amenitiesList: string[] = request.amenitiesList

            const _size: number = size == null ? defaultSize : size
            console.log("Page: " + page)
            console.log("Size: " + _size)
            console.log("City: " + city)
            console.log("Category: " + category)
            console.log("PriceRange: " + priceRange)
            console.log("FeaturesList: " + featuresList)

            if (!Array.isArray(priceRange) || priceRange.length != 2) return res.status(400).send('Invalid price range: price range must be an array of two numbers.')
            if (priceRange[0] > priceRange[1]) return res.status(400).send('Invalid price range: starting price cannot be greater than ending price.')

            return this.homeRepositoryElastic.searchHomes(page, _size, city, guestsNumber, category, priceRange, featuresList, amenitiesList)
                .then(response => res.status(200).json(response))
                .catch(error => res.status(error.status).send(error.error))

        } catch (e) {
            console.log("Bad request format:" + e)
            return res.status(400).send("Bad request format")
        }
    }

    async uploadHome(req: any, res: any): Promise<void> {
        console.log("Insert home")
        const request: HomeRequest = req.body;
        const home: Home = {
            id: null,
            hostUsername: request.hostUsername,
            city: request.city,
            country: request.country,
            imagesUrls: request.imagesUrls,
            pricePerNight: parseInt(request.pricePerNight),
            score: null,
            features: request.features.split(","),
            amenities: request.amenities.split(","),
            categories: request.categories.split(","),
            maxGuests: parseInt(request.maxGuests)
        }

        let insertedValue: Home | null = null;
        try {
            insertedValue = await this.homeRepository.create(home);
            if (insertedValue != null && insertedValue.id != undefined) {
                console.log(`inserted id: ${insertedValue.id}`)
                home.id = insertedValue?.id

                try {
                    console.log(`Is array: ${Array.isArray(home.imagesUrls)}`)
                    await this.homeRepositoryElastic.createHome(home);
                } catch (error) {
                    return res.status(500).send(`Error creating home elastic: ${error}`);
                }
            }
        } catch (err) {
            return res.status(500).send(`Error creating home: ${err}`);
        }

        return res.status(201).json(new HomeResponse(insertedValue))
    }
}