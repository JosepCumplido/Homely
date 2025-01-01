import {Home} from "shared/models/home";
import {CategoryBadges} from "@/app/(pages)/home/[id]/CategoryBadges";

interface HomeHeaderProps {
    home: Home
}

export function HomeHeader({home}: HomeHeaderProps) {
    return (
        <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-3xl font-bold">{home.city}, {home.country}</h1>
            </div>
            <CategoryBadges categories={home.categories}/>
        </div>
    )
}
