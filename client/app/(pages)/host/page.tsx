'use client';
import React, {useEffect} from 'react';
import {Button} from '@/components/ui/button';
import type {Category} from 'shared/models/category';
import type {FeatureType} from 'shared/models/featureType';
import type {AmenityType} from 'shared/models/amenityType';
import {
    Building2,
    CableCar,
    Castle,
    Fence,
    Gem,
    Mountain,
    Sailboat,
    TentTree,
    TreePalm,
    TreePine,
    Waves
} from 'lucide-react';
import {PhotoUploader} from '@/components/host/imageUploader';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {useRouter} from 'next/navigation';
import {useAccommodationForm} from "@/hooks/useAccommodationForm";
import {useAuth} from "@/context/authContext";
import {FeaturesAndAmenities} from "@/app/(pages)/host/FeaturesAndAmenities";
import {CategorySelector} from "@/app/(pages)/host/CategorySelector";
import {MainInformation} from "@/app/(pages)/host/MainInformation";

const categories: Category[] = [
    {name: 'beach', label: 'Beach', icon: <TreePalm height={24} width={24} strokeWidth={1.2}/>},
    {name: 'countryside', label: 'Countryside', icon: <Fence height={24} width={24} strokeWidth={1.2}/>},
    {name: 'city', label: 'City', icon: <Building2 height={24} width={24} strokeWidth={1.2}/>},
    {name: 'cabins', label: 'Cabins', icon: <TreePine height={24} width={24} strokeWidth={1.2}/>},
    {name: 'boats', label: 'Boats', icon: <Sailboat height={24} width={24} strokeWidth={1.2}/>},
    {name: 'castles', label: 'Castles', icon: <Castle height={24} width={24} strokeWidth={1.2}/>},
    {name: 'skiing', label: 'Skiing', icon: <CableCar height={24} width={24} strokeWidth={1.2}/>},
    {name: 'lake', label: 'Lake', icon: <Waves height={24} width={24} strokeWidth={1.2}/>},
    {name: 'luxe', label: 'Luxe', icon: <Gem height={24} width={24} strokeWidth={1.2}/>},
    {name: 'mountain', label: 'Mountain', icon: <Mountain height={24} width={24} strokeWidth={1.2}/>},
    {name: 'camping', label: 'Camping', icon: <TentTree height={24} width={24} strokeWidth={1.2}/>},
];
const featureTypes: FeatureType[] = [
    {
        label: 'Kitchen',
        features: ['Oven', 'Microwave', 'Dishwasher', 'Refrigerator', 'Freezer', 'Utensils and dishware', 'Electric kettle', 'Toaster', 'Coffee machine'],
    },
    {
        label: 'Bathroom',
        features: ['Hairdryer', 'Shower', 'Bathtub', 'Towel warmer', 'Towels included', 'Accessible bathroom', 'Bidet', 'Toiletries'],
    },
    {label: 'Bedroom', features: ['King-size bed', 'Individual beds']},
    {
        label: 'Living areas',
        features: ['TV', 'Dedicated workspace', 'Hardwood flooring', 'Carpet flooring', 'Balcony', 'Terrace', 'Private garden'],
    },
];
const amenityTypes: AmenityType[] = [
    {label: 'Comfort', amenities: ['Air conditioning', 'Heating', 'Soundproofing', 'Fireplace']},
    {
        label: 'Conveniences',
        amenities: ['Wi-Fi', 'High-speed internet', 'Satellite TV', 'Washer', 'Dryer', 'Ironing board', 'Vacuum and cleaning tools', 'Private parking available', 'Elevator'],
    },
    {
        label: 'Security and safety',
        amenities: ['Reception or concierge', 'Surveillance or cameras', 'Alarm', 'Smoke detector', 'Monoxide detector', 'Fire extinguisher', 'First aid kit'],
    },
    {
        label: 'Additional services',
        amenities: ['Gym', 'Pool', 'Spa or sauna', 'BBQ area', 'Meal service', 'Green spaces', 'Children\'s play area', 'Crib'],
    },
];

export default function CreateAddPage() {
    const {isAuthenticated} = useAuth();
    const router = useRouter();
    const {
        city,
        country,
        selectedCategoriesList,
        selectedFeaturesList,
        selectedAmenitiesList,
        uploading,
        onLocationChange,
        handlePhotosChange,
        handleCreateHome,
        setSelectedCategoriesList,
        setSelectedFeaturesList,
        setSelectedAmenitiesList,
    } = useAccommodationForm()

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        formData.append('city', city)
        formData.append('country', country)
        handleCreateHome(formData)
    }

    return (
        <div className="container mx-auto py-10">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">Create a New Accommodation</CardTitle>
                </CardHeader>
                <CardContent>
                    <form id="form" className="space-y-8" onSubmit={handleSubmit}>
                        <MainInformation city={city} country={country} onLocationChange={onLocationChange}/>

                        <Separator/>

                        <CategorySelector
                            categories={categories}
                            selectedCategories={selectedCategoriesList}
                            onCategoryChange={(category) => setSelectedCategoriesList(prev => prev.includes(category) ? prev.filter(item => item !== category) : [...prev, category])}
                        />

                        <Separator/>

                        <FeaturesAndAmenities
                            featureTypes={featureTypes}
                            amenityTypes={amenityTypes}
                            selectedFeatures={selectedFeaturesList}
                            selectedAmenities={selectedAmenitiesList}
                            onFeatureClick={(feature) => setSelectedFeaturesList(prev =>
                                prev.includes(feature) ? prev.filter(item => item !== feature) : [...prev, feature]
                            )}
                            onAmenityClick={(amenity) => setSelectedAmenitiesList(prev =>
                                prev.includes(amenity) ? prev.filter(item => item !== amenity) : [...prev, amenity]
                            )}
                        />

                        <div>
                            <h2 className="text-xl font-semibold mb-4">Photos</h2>
                            <PhotoUploader onPhotosChange={handlePhotosChange}/>
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" className="w-full md:w-auto" disabled={uploading}>
                                {uploading ? 'Publishing...' : 'Publish'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

