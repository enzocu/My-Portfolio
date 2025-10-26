"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageCarousel() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const images = [
		{ src: "/mobile-app-first-aid.jpg", alt: "Professional photo 1" },
		{ src: "/mobile-app-first-aid.jpg", alt: "Professional photo 2" },
		{ src: "/mobile-app-first-aid.jpg", alt: "Professional photo 3" },
		{ src: "/mobile-app-first-aid.jpg", alt: "Professional photo 4" },
	];

	const nextSlide = () => {
		setCurrentIndex((prev) => (prev + 1) % images.length);
	};

	const prevSlide = () => {
		setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
	};

	return (
		<section className="scroll-mt-20">
			<h2 className="text-2xl lg:text-3xl font-bold text-purple-500 mb-6">
				Gallery
			</h2>
			<div className="relative w-full h-76 rounded-lg overflow-hidden border border-border bg-muted">
				<img
					src={images[currentIndex].src || "/placeholder.svg"}
					alt={images[currentIndex].alt}
					className="w-full h-full object-cover"
				/>

				<button
					onClick={prevSlide}
					className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
					aria-label="Previous image"
				>
					<ChevronLeft className="w-6 h-6 text-white" />
				</button>
				<button
					onClick={nextSlide}
					className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
					aria-label="Next image"
				>
					<ChevronRight className="w-6 h-6 text-white" />
				</button>

				<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
					{images.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentIndex(index)}
							className={`w-2 h-2 rounded-full transition-all ${
								index === currentIndex ? "bg-purple-500 w-6" : "bg-white/50"
							}`}
							aria-label={`Go to image ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
