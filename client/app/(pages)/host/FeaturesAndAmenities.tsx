import DisplayGroup from "@/components/host/displayGroup";
import {FeatureType} from "shared/models/featureType";
import {AmenityType} from "shared/models/amenityType";

interface FeaturesAndAmenitiesProps {
    featureTypes: FeatureType[];
    amenityTypes: AmenityType[];
    selectedFeatures: string[];
    selectedAmenities: string[];
    onFeatureClick: (feature: string) => void;
    onAmenityClick: (amenity: string) => void;
}

export function FeaturesAndAmenities(props: FeaturesAndAmenitiesProps) {
    return (
        <>
            <div>
                <h2 className="text-xl font-semibold mb-4">Property Features</h2>
                <DisplayGroup
                    groups={props.featureTypes.map((type) => ({
                        label: type.label,
                        subItems: type.features,
                    }))}
                    selectedItems={props.selectedFeatures}
                    onItemClick={props.onFeatureClick}
                />
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">Property Amenities</h2>
                <DisplayGroup
                    groups={props.amenityTypes.map((type) => ({
                        label: type.label,
                        subItems: type.amenities,
                    }))}
                    selectedItems={props.selectedAmenities}
                    onItemClick={props.onAmenityClick}
                />
            </div>
        </>
    )
}

