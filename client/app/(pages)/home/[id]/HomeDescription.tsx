import {Separator} from "@/components/ui/separator";
import {Home} from "shared/models/home";

interface HomeDescriptionProps {
    home: Home
}

export function HomeDescription({ home }: HomeDescriptionProps) {
    const hasAmenitiesOrFeatures = home.features.length > 0 || home.amenities.length > 0;

    if (!hasAmenitiesOrFeatures) return null

    return (
        <>
            <Separator/>
            <div className={""}>
                <p className="text-xl font-semibold pb-6">What this place offers</p>
                <div className={"w-full flex items-stretch flex-wrap justify-start"}>
                    {home?.amenities.map((amenity, key) => (
                        <p key={key} className={"w-1/2 pb-4"}>{amenity}</p>
                    ))}

                    {home?.features.map((features, key) => (
                        <p key={key} className={"w-1/2 pb-4"}>{features}</p>
                    ))}
                </div>
            </div>
        </>
    )
}