import Image from "next/image";

export function ImageMosaic({imageUrls}: { imageUrls: string[] }) {
    return (
        <div className="w-full aspect-[2.32] mx-auto grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden">
            <div className="col-span-2 row-span-2 relative">
                <Image
                    src={imageUrls[0] ? `/uploads/${imageUrls[0]}` : '/uploads/default_image.webp'}
                    alt={`Image of home`}
                    fill
                    className={"object-cover hover:brightness-90 transition duration-150"}
                />
            </div>
            <div className="col-start-3 relative">
                <Image
                    src={imageUrls[1] ? `/uploads/${imageUrls[1]}` : '/uploads/default_image.webp'}
                    alt={`Image of home`}
                    fill
                    className={"object-cover hover:brightness-90 transition duration-150"}
                />
            </div>
            <div className="col-start-4 relative">
                <Image
                    src={imageUrls[2] ? `/uploads/${imageUrls[2]}` : '/uploads/default_image.webp'}
                    alt={`Image of home`}
                    fill
                    className={"object-cover hover:brightness-90 transition duration-150"}
                />
            </div>
            <div className="col-start-3 row-start-2 relative">
                <Image
                    src={imageUrls[3] ? `/uploads/${imageUrls[3]}` : '/uploads/default_image.webp'}
                    alt={`Image of home`}
                    fill
                    className={"object-cover hover:brightness-90 transition duration-150"}
                />
            </div>
            <div className="col-start-4 row-start-2 relative">
                <Image
                    src={imageUrls[4] ? `/uploads/${imageUrls[4]}` : '/uploads/default_image.webp'}
                    alt={`Image of home`}
                    fill
                    className={"object-cover hover:brightness-90 transition duration-150"}
                />
            </div>
        </div>
    )
}