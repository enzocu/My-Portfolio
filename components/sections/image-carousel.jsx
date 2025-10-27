"use client";

import { useUserAuth } from "@/contexts/user-context";

export default function ImageCarousel() {
	const { userDetails } = useUserAuth();
	const userGallery = userDetails?.us_gallery || [];

	const validImages = Array.isArray(userGallery)
		? userGallery.filter((url) => typeof url === "string" && url.trim() !== "")
		: [];

	const images = [...validImages, ...validImages];

	return (
		<section id="gallery" className="scroll-mt-20">
			<h2 className="text-2xl lg:text-3xl font-bold text-blue-700 mb-6">
				Gallery
			</h2>

			{validImages.length === 0 ? (
				<p className="text-muted-foreground text-sm">No Image uploaded.</p>
			) : (
				<div className="relative overflow-hidden">
					<div className="flex gap-6 animate-scroll">
						{images.map((url, index) => (
							<div
								key={index}
								className="flex-shrink-0 w-[400px] h-[250px] rounded-2xl overflow-hidden border border-gray-300 shadow-md  transition-transform duration-300"
							>
								<img
									src={url || "/placeholder.svg"}
									alt={`Gallery image ${index + 1}`}
									className="w-full h-full object-cover"
								/>
							</div>
						))}
					</div>
				</div>
			)}
		</section>
	);
}
