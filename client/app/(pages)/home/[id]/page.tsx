import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ScrollArea} from "@/components/ui/scroll-area";
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
    Waves,
    Euro,
    MapPin
} from 'lucide-react';
import {Button} from "@/components/ui/button";
import {Home} from "shared/models/home";
import {ImageMosaic} from "@/app/(pages)/home/[id]/image-mosaic";
import {CategoryBadges} from "@/app/(pages)/home/[id]/category-badges";
import {BookingDetails} from "@/app/(pages)/home/[id]/booking-details";

const fetchHomeData = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/${id}`, {cache: 'no-store'});
    if (!res.ok) return null;
    return res.json();
};

export default async function HomePage({params}: { params: { id: string } }) {
    const home: Home | null = await fetchHomeData(params.id);

    if (!home) {
        notFound();
    }

    return (
        <div className="py-8 space-y-6">
            <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-3xl font-bold">{home.city}, {home.country}</h1>
                </div>
                <CategoryBadges categories={home.categories}/>
            </div>

            {/*<Carousel className="w-full max-w-4xl mx-auto mb-8">
                <CarouselContent>
                    {home.imagesUrls && home.imagesUrls.length > 0 ? (
                        home.imagesUrls.map((imageName, index) => (
                            <CarouselItem key={index}>
                                <div className="relative aspect-video">
                                    <Image
                                        src={`/uploads/${imageName}`}
                                        alt={`Image of home in ${home.city}`}
                                        fill
                                        className="rounded-lg object-cover"
                                    />
                                </div>
                            </CarouselItem>
                        ))
                    ) : (
                        <CarouselItem>
                            <div className="relative aspect-video bg-muted flex items-center justify-center">
                                <span className="text-muted-foreground">No images available</span>
                            </div>
                        </CarouselItem>
                    )}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>*/}

            <ImageMosaic imageUrls={home.imagesUrls}/>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>About this place</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="features">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="features">Features</TabsTrigger>
                                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                            </TabsList>
                            <TabsContent value="features">
                                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                                    {home.features && home.features.length > 0 ? (
                                        <div className="grid grid-cols-2 gap-2">
                                            {home.features.map((feature, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <Badge variant="outline">{feature}</Badge>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-muted-foreground">No features available</span>
                                    )}
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="amenities">
                                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                                    {home.amenities && home.amenities.length > 0 ? (
                                        <ul className="grid grid-cols-2 gap-2">
                                            {home.amenities.map((amenity, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <Badge variant="outline">{amenity}</Badge>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span className="text-muted-foreground">No amenities available</span>
                                    )}
                                </ScrollArea>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                <BookingDetails home={home}/>
            </div>
        </div>
    );
}

