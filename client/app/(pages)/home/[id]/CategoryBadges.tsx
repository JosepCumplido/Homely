import {Badge} from "@/components/ui/badge";

export function CategoryBadges({categories}:{categories: string[]}) {
    return (
        <div className="flex flex-wrap gap-2">
            {categories && categories.length > 0 ? (
                categories.map((category, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-2">
                        <span>{category.capitalize()}</span>
                    </Badge>
                ))
            ) : (
                <span className="text-muted-foreground">No categories available</span>
            )}
        </div>
    )
}