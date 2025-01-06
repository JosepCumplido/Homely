import {useAuth} from "@/context/authContext";
import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import {Pair} from "@/utils/types";
import {HomeRequest} from "shared/data/homeRequest";

export const useAccommodationForm = () => {
    const { user } = useAuth()
    const router = useRouter()

    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    const [selectedCategoriesList, setSelectedCategoriesList] = useState<string[]>([]);
    const [selectedFeaturesList, setSelectedFeaturesList] = useState<string[]>([]);
    const [selectedAmenitiesList, setSelectedAmenitiesList] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);

    const onLocationChange = useCallback((value: Pair<string, string>) => {
        setCountry(value[0]);
        setCity(value[1]);
    }, []);

    const handlePhotosChange = (photos: File[]) => {
        setUploadedImages((prev) => [...prev, ...photos]);
    };

    const handleCreateHome = async (formData: FormData) => {
        setUploading(true);

        try {
            const uploadedImageUrls: string[] = await Promise.all(uploadedImages.map(async (file) => {
                const formDataImage = new FormData();
                formDataImage.append('file', file);
                const response = await fetch('/api/upload', { method: 'POST', body: formDataImage });
                const result = await response.json();
                return result.url;
            }));

            const request: HomeRequest = {
                hostUsername: user.username,
                city,
                country,
                imagesUrls: uploadedImageUrls,
                pricePerNight: formData.get("pricePerNight") as string,
                features: selectedFeaturesList.join(","),
                amenities: selectedAmenitiesList.join(","),
                categories: selectedCategoriesList.join(","),
                maxGuests: formData.get("maxGuests") as string
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/upload/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            });

            if (response.ok) {
                alert("Ad created successfully!");
                const result = await response.json();
                console.log(result);
                await router.push('/');
            } else {
                const error = await response.json();
                throw new Error(error.message);
            }
        } catch (error) {
            console.error("Error creating the ad:", error);
            alert("Failed to create ad. Please try again later.");
        } finally {
            setUploading(false);
        }
    };

    return {
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
    };

}