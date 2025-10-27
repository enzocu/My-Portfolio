"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";
import { AVAILABLE_TECHNOLOGIES } from "./technologies-list";
import { updateTechnology } from "@/controller/update/updateTechnology";
import { LoadingSpinner } from "@/components/ui/loading";

export default function TechnologyDialog({
	isOpen,
	onClose,
	registeredTechnologies,
	usRef,
	showAlert,
}) {
	const [selectedTechs, setSelectedTechs] = useState([]);
	const [btnLoading, setBtnLoading] = useState(false);

	const handleTechToggle = (techName) => {
		setSelectedTechs((prev) =>
			prev.includes(techName)
				? prev.filter((t) => t !== techName)
				: [...prev, techName]
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (selectedTechs.length === 0) {
			showAlert?.("Please select at least one technology.", "danger");
			return;
		}

		await updateTechnology(
			usRef,
			registeredTechnologies,
			selectedTechs,
			setBtnLoading,
			showAlert,
			onClose
		);

		setSelectedTechs([]);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="flex items-center justify-between mb-6 p-6 border-b border-border">
					<h2 className="text-xl font-semibold text-foreground">
						Register Technologies
					</h2>
					<button
						onClick={onClose}
						className="text-muted-foreground hover:text-foreground transition-colors"
						aria-label="Close dialog"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="space-y-5 p-6 pt-0">
					<div>
						<label className="block text-sm text-foreground mb-3">
							Select Technologies <span className="text-red-500">*</span>
						</label>
						<div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto border border-border rounded-lg p-3 bg-background">
							{AVAILABLE_TECHNOLOGIES.map((tech) => {
								const Icon = tech.icon;
								const isSelected = selectedTechs.includes(tech.name);

								return (
									<button
										key={tech.name}
										type="button"
										onClick={() => handleTechToggle(tech.name)}
										className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
											isSelected
												? "bg-primary text-primary-foreground"
												: "bg-muted text-muted-foreground hover:bg-muted/80"
										}`}
									>
										{isSelected && <Check className="w-4 h-4" />}
										{Icon && <Icon className="w-4 h-4" />}
										<span>{tech.name}</span>
									</button>
								);
							})}
						</div>
						{selectedTechs.length > 0 && (
							<p className="text-xs text-muted-foreground mt-2">
								{selectedTechs.length} selected
							</p>
						)}
					</div>

					<button
						type="submit"
						disabled={btnLoading || selectedTechs.length === 0}
						className="flex items-center justify-center w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity text-sm"
					>
						{btnLoading ? (
							<LoadingSpinner loading={btnLoading} />
						) : (
							"Register Technologies"
						)}
					</button>
				</form>
			</div>
		</div>
	);
}
