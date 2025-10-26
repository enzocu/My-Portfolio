"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useAlert } from "@/contexts/alert-context";

export default function SignInDialog({ isOpen, onClose, onSubmit }) {
	const [pin, setPin] = useState(["", "", "", "", "", ""]);
	const inputRefs = useRef([]);
	const { showAlert } = useAlert();

	useEffect(() => {
		if (isOpen) {
			setPin(["", "", "", "", "", ""]);
			inputRefs.current[0]?.focus();
		}
	}, [isOpen]);

	const handleInputChange = (index, value) => {
		if (!/^\d*$/.test(value)) return;

		const newPin = [...pin];
		newPin[index] = value;

		setPin(newPin);

		if (value && index < 5) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !pin[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		} else if (e.key === "ArrowLeft" && index > 0) {
			inputRefs.current[index - 1]?.focus();
		} else if (e.key === "ArrowRight" && index < 5) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (pin.some((digit) => digit === "")) {
			showAlert("Please enter all 6 digits", "warning");
			return;
		}

		const fullPin = pin.join("");
		onSubmit(fullPin);
		showAlert("Sign in successful!", "success");
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div className="bg-card border border-border rounded-xl shadow-xl w-full max-w-sm mx-4 animate-in fade-in zoom-in-95 duration-300">
				{/* Header */}
				<div className="flex items-center justify-between mb-6 p-6 border-b border-border">
					<h2 className="text-xl font-semibold text-foreground">Sign In</h2>
					<button
						onClick={onClose}
						className="p-1 hover:bg-muted rounded-lg transition-colors"
						aria-label="Close dialog"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6 p-6 pt-0">
					{/* PIN Input */}
					<div>
						<label className="block text-sm font-medium text-foreground mb-3">
							Enter 6-Digit PIN
						</label>
						<div className="flex gap-2 justify-center">
							{pin.map((digit, index) => (
								<input
									key={index}
									ref={(el) => (inputRefs.current[index] = el)}
									type="text"
									inputMode="numeric"
									maxLength="1"
									value={digit}
									onChange={(e) => handleInputChange(index, e.target.value)}
									onKeyDown={(e) => handleKeyDown(index, e)}
									className="w-12 h-12 text-center text-lg font-semibold border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors bg-background text-foreground"
									aria-label={`PIN digit ${index + 1}`}
								/>
							))}
						</div>
					</div>

					{/* Buttons */}
					<div className="flex gap-3">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm  text-foreground"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm "
						>
							Sign In
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
