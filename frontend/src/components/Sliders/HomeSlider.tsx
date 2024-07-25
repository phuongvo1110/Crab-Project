import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function HomeSlider() {
  return (
    <Carousel className="max-w-[80vw] mx-auto">
      <CarouselPrevious className="xl:hidden" />
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="h-[70vh]">
                <CardContent className="flex items-center justify-center p-6">
                  <h2 className="h-fit w-fit text-4xl font-semibold">
                    Image {index + 1}
                  </h2>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="xl:hidden" />
    </Carousel>
  );
}
