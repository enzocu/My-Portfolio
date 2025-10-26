"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";
import { AVAILABLE_TECHNOLOGIES } from "./technologies-list";

export default function TechnologyDialog({ isOpen, onClose, onSubmit }) {
	const [selectedTechs, setSelectedTechs] = useState([]);

	const handleTechToggle = (tech) => {
		setSelectedTechs((prev) =>
			prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (selectedTechs.length > 0) {
			onSubmit({ technologies: selectedTechs });
			setSelectedTechs([]);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
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

				<form onSubmit={handleSubmit} className="space-y-5 p-6 pt-0 ">
					<div>
						<label className="block text-sm  text-foreground mb-3">
							Select Technologies <span className="text-red-500">*</span>
						</label>
						<div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto border border-border rounded-lg p-3 bg-background">
							{AVAILABLE_TECHNOLOGIES.map((tech) => (
								<button
									key={tech}
									type="button"
									onClick={() => handleTechToggle(tech)}
									className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
										selectedTechs.includes(tech)
											? "bg-primary text-primary-foreground"
											: "bg-muted text-muted-foreground hover:bg-muted/80"
									}`}
								>
									{selectedTechs.includes(tech) && (
										<Check className="w-4 h-4" />
									)}
									{tech}
								</button>
							))}
						</div>
						{selectedTechs.length > 0 && (
							<p className="text-xs text-muted-foreground mt-2">
								{selectedTechs.length} selected
							</p>
						)}
					</div>

					<button
						type="submit"
						disabled={selectedTechs.length === 0}
						className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity  text-sm"
					>
						Register Technologies
					</button>
				</form>
			</div>
		</div>
	);
}
