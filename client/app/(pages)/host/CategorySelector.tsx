import {Category} from "shared/models/category";
import {clsx} from "clsx";

interface CategorySelectorProps {
    categories: Category[];
    selectedCategories: string[];
    onCategoryChange: (category: string) => void;
}

export function CategorySelector(props: CategorySelectorProps) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {props.categories.map((category) => (
                    <div
                        key={category.name}
                        onClick={() => props.onCategoryChange(category.name)}
                        className={clsx(
                            'flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all',
                            {
                                'bg-primary text-primary-foreground': props.selectedCategories.includes(category.name),
                                'bg-secondary hover:bg-secondary/80': !props.selectedCategories.includes(category.name),
                            }
                        )}
                    >
                        {category.icon}
                        <div className="text-sm text-center mt-2">{category.label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}