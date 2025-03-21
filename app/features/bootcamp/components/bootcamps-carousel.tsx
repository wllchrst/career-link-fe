import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { BootcampCard } from "~/components/bootcamp/bootcamp-card";
import type { Bootcamp } from "~/types/api";

interface BootcampsCarouselProps {
  bootcamps: Bootcamp[];
}

export const BootcampsCarousel = ({ bootcamps }: BootcampsCarouselProps) => {
  return (
    <div className="relative">
      <button className="absolute left-[-1vw] top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-accent text-white rounded-full shadow-md">
        <FaArrowLeft />
      </button>

      <div className="flex gap-6 overflow-x-hidden">
        {bootcamps.map((bootcamp) => (
          <BootcampCard key={bootcamp.id} bootcamp={bootcamp} />
        ))}
      </div>

      <button className="absolute right-[-1vw] top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-accent text-white rounded-full shadow-md">
        <FaArrowRight />
      </button>
    </div>
  );
};
