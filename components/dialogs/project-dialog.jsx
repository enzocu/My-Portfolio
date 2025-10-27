"use client";

import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { AVAILABLE_TECHNOLOGIES } from "@/components/dialogs/technologies-list";
import { saveProject } from "@/controller/save/saveProject";
import { LoadingSpinner } from "@/components/ui/loading";

export default function ProjectDialog({
	isOpen,
	onClose,
	projectData = null,
	userDetails,
	userRef,
	showAlert,
}) {
	const userTechs = userDetails?.us_technology || [];

	const [formData, setFormData] = useState({
		picture: null,
		title: "",
		about: "",
		date: "",
		technologies: [],
		url: "",
	});
	const [imagePreview, setImagePreview] = useState(null);
	const [btnLoading, setBtnLoading] = useState(false);

	const filteredTechs = AVAILABLE_TECHNOLOGIES.filter((t) =>
		userTechs.includes(t.name)
	);

	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "auto";
		if (projectData) {
			setFormData({
				picture: projectData.pr_photoURL || null,
				title: projectData.pr_title || "",
				about: projectData.pr_description || "",
				date: projectData.pr_date || "",
				technologies: projectData.pr_technology || [],
				url: projectData.pr_url || "",
			});
			setImagePreview(projectData.pr_photoURL || null);
		} else {
			setFormData({
				picture: null,
				title: "",
				about: "",
				date: "",
				technologies: [],
				url: "",
			});
			setImagePreview(null);
		}
		return () => (document.body.style.overflow = "auto");
	}, [isOpen, projectData]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			setFormData((prev) => ({ ...prev, picture: file }));
			const reader = new FileReader();
			reader.onloadend = () => setImagePreview(reader.result);
			reader.readAsDataURL(file);
		}
	};

	const handleTechToggle = (tech) => {
		setFormData((prev) => ({
			...prev,
			technologies: prev.technologies.includes(tech)
				? prev.technologies.filter((t) => t !== tech)
				: [...prev.technologies, tech],
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.title || !formData.about || !formData.date) {
			showAlert?.("Please fill all required fields.", "danger");
			return;
		}

		await saveProject({
			userRef,
			projectData,
			formData,
			setBtnLoading,
			showAlert,
			onClose,
		});
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md mx-6 max-h-[90vh] flex flex-col overflow-hidden">
				<div className="flex items-center justify-between p-6 border-b border-border">
					<h2 className="text-xl font-semibold text-foreground">
						{projectData ? "Update Project" : "Register Project"}
					</h2>
					<button
						onClick={onClose}
						className="text-muted-foreground hover:text-foreground"
						aria-label="Close dialog"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

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
								className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:ring-2 focus:ring-primary"
							/>
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

						<div>
							<label className="block text-sm text-foreground mb-2">
								Title <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								name="title"
								value={formData.title}
								onChange={handleInputChange}
								placeholder="Project title"
								className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:ring-2 focus:ring-primary"
								required
							/>
						</div>

						<div>
							<label className="block text-sm text-foreground mb-2">
								About <span className="text-red-500">*</span>
							</label>
							<textarea
								name="about"
								value={formData.about}
								onChange={handleInputChange}
								placeholder="Project description"
								rows="4"
								className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:ring-2 focus:ring-primary resize-none"
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
								className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:ring-2 focus:ring-primary"
								required
							/>
						</div>

						<div>
							<label className="block text-sm text-foreground mb-2">URL</label>
							<input
								type="url"
								name="url"
								value={formData.url}
								onChange={handleInputChange}
								placeholder="Project URL"
								className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:ring-2 focus:ring-primary"
								required
							/>
						</div>

						<div>
							<label className="block text-sm text-foreground mb-3">
								Technologies Used
							</label>
							<div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-border rounded-lg p-3 bg-background">
								{filteredTechs.map((tech) => {
									const Icon = tech.icon;
									return (
										<button
											key={tech.name}
											type="button"
											onClick={() => handleTechToggle(tech.name)}
											className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
												formData.technologies.includes(tech.name)
													? "bg-primary text-primary-foreground"
													: "bg-muted text-muted-foreground hover:bg-muted/80"
											}`}
										>
											{formData.technologies.includes(tech.name) && (
												<Check className="w-4 h-4" />
											)}
											<Icon className="w-4 h-4" />
											{tech.name}
										</button>
									);
								})}
							</div>
							{formData.technologies.length > 0 && (
								<p className="text-xs text-muted-foreground mt-2">
									{formData.technologies.length} selected
								</p>
							)}
						</div>

						<button
							type="submit"
							disabled={btnLoading}
							className=" flex items-center justify-center w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm"
						>
							{btnLoading ? (
								<LoadingSpinner loading={btnLoading} />
							) : projectData ? (
								"Update Project"
							) : (
								"Register Project"
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
