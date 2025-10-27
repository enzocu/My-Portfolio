"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { updateGallery } from "../../controller/update/updateGallery";
import { LoadingSpinner } from "@/components/ui/loading";

export default function GalleryDialog({
	isOpen,
	onClose,
	registeredImages = [],
	deleteImage = null,
	usRef,
	showAlert,
}) {
	const [formData, setFormData] = useState({ picture: null });
	const [imagePreview, setImagePreview] = useState(null);
	const [btnLoading, setBtnLoading] = useState(false);

	const handleFileChange = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			setFormData({ picture: file });
			const reader = new FileReader();
			reader.onloadend = () => setImagePreview(reader.result);
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.picture) return;

		try {
			await updateGallery(
				usRef,
				formData.picture,
				registeredImages,
				deleteImage,
				setBtnLoading,
				showAlert,
				onClose
			);

			setFormData({ picture: null });
			setImagePreview(null);
		} catch (err) {
			console.error(err);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md mx-6">
				<div className="flex items-center justify-between mb-6 p-6 border-b border-border">
					<h2 className="text-xl font-semibold text-foreground">
						Add to Gallery
					</h2>
					<button
						onClick={onClose}
						className="text-muted-foreground hover:text-foreground transition-colors"
						aria-label="Close dialog"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-5 p-6 pt-0">
					<div>
						<label className="block text-sm font-medium text-foreground mb-2">
							Picture <span className="text-red-500">*</span>
						</label>
						<input
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
							required
						/>
						{formData.picture && (
							<p className="text-xs text-muted-foreground mt-1">
								{formData.picture.name}
							</p>
						)}

						{imagePreview && (
							<div className="mt-3 rounded-lg overflow-hidden border border-border">
								<img
									src={imagePreview}
									alt="Preview"
									className="w-full h-40 object-cover"
								/>
							</div>
						)}
					</div>

					<button
						type="submit"
						className="flex items-center justify-center w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
					>
						{btnLoading ? (
							<LoadingSpinner loading={btnLoading} />
						) : (
							"Add to Gallery"
						)}
					</button>
				</form>
			</div>
		</div>
	);
}
