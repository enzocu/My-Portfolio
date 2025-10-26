"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function AchievementsDialog({ isOpen, onClose, onSubmit }) {
	const [formData, setFormData] = useState({
		picture: null,
		title: "",
		date: "",
	});
	const [imagePreview, setImagePreview] = useState(null);

	// Prevent body scroll when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			setFormData((prev) => ({ ...prev, picture: file }));
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (formData.picture && formData.title && formData.date) {
			onSubmit(formData);
			setFormData({ picture: null, title: "", date: "" });
			setImagePreview(null);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
					<h2 className="text-xl font-semibold text-foreground">
						Register Achievement
					</h2>
					<button
						onClick={onClose}
						className="text-muted-foreground hover:text-foreground transition-colors"
						aria-label="Close dialog"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Body (scrollable) */}
				<div className="p-6 overflow-y-auto flex-1 space-y-5">
					<form onSubmit={handleSubmit} className="space-y-5">
						<div>
							<label className="block text-sm text-foreground mb-2">
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
										src={imagePreview || "/placeholder.svg"}
										alt="Preview"
										className="w-full h-40 object-cover"
									/>
								</div>
							)}
						</div>

						<div>
							<label className="block text-sm text-foreground mb-2">
								Title <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								name="title"
								value={formData.title}
								onChange={handleInputChange}
								placeholder="Achievement title"
								className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
								required
							/>
						</div>

						<div>
							<label className="block text-sm text-foreground mb-2">
								Date <span className="text-red-500">*</span>
							</label>
							<input
								type="date"
								name="date"
								value={formData.date}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
								required
							/>
						</div>

						<button
							type="submit"
							className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm"
						>
							Register Achievement
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
