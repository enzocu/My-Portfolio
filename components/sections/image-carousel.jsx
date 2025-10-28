"use client";

import { useState } from "react";
import { useUserAuth } from "@/contexts/user-context";
import { X } from "lucide-react";
import { updateGallery } from "@/controller/update/updateGallery";
import { useAlert } from "@/contexts/alert-context";

export default function ImageCarousel() {
	const { userDetails, userRef } = useUserAuth();
	const { showAlert } = useAlert();
	const userGallery = userDetails?.us_gallery || [];

	const validImages = Array.isArray(userGallery)
		? userGallery.filter((url) => typeof url === "string" && url.trim() !== "")
		: [];

	const images = [...validImages, ...validImages];

	const [btnLoading, setBtnLoading] = useState(false);

	const handleDelete = async (url) => {
		try {
			await updateGallery(
				userRef,
				null,
				validImages,
				url,
				setBtnLoading,
				showAlert
			);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<section id="gallery" className="scroll-mt-20">
			<h2 className="text-2xl lg:text-3xl font-bold text-blue-700 mb-6">
				Gallery
			</h2>

			{validImages.length === 0 ? (
				<p className="text-muted-foreground text-sm">No Image uploaded.</p>
			) : (
				<div className="relative overflow-hidden">
					<div
						className="flex gap-6 animate-scroll"
						style={{ animationPlayState: "running" }}
						onMouseEnter={(e) =>
							(e.currentTarget.style.animationPlayState = "paused")
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.animationPlayState = "running")
						}
					>
						{images.map((url, index) => (
							<div
								key={index}
								className="flex-shrink-0 w-[250px] h-[150px] sm:w-[350px] sm:h-[200px] rounded-lg overflow-hidden border border-gray-300 shadow-md relative transition-transform duration-300 bg-gray-100"
							>
								<img
									src={url || "/placeholder.svg"}
									alt={`Gallery image ${index + 1}`}
									className="w-full h-full object-cover"
								/>

								{userDetails?.isCurrentUser && (
									<button
										onClick={() => handleDelete(url)}
										className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
										aria-label="Delete image"
										disabled={btnLoading}
									>
										<X className="w-4 h-4" />
									</button>
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</section>
	);
}
