"use client";

import { AlertCircle } from "lucide-react";
import { useAlert } from "@/contexts/alert-context";

export default function SignOutConfirmationDialog({
	isOpen,
	onClose,
	onConfirm,
}) {
	const { showAlert } = useAlert();

	const handleConfirm = () => {
		onConfirm();
		showAlert("You have been signed out", "success");
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div className="bg-card border border-border rounded-xl shadow-xl w-full max-w-sm mx-4 p-6 animate-in fade-in zoom-in-95 duration-300">
				{/* Icon and Header */}
				<div className="flex items-center gap-3 mb-4">
					<div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
						<AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
					</div>
					<h2 className="text-lg font-semibold text-foreground">Sign Out?</h2>
				</div>

				{/* Message */}
				<p className="text-sm text-muted-foreground mb-6">
					Are you sure you want to sign out? You'll need to enter your PIN again
					to access your account.
				</p>

				{/* Buttons */}
				<div className="flex gap-3">
					<button
						onClick={onClose}
						className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm text-foreground"
					>
						Cancel
					</button>
					<button
						onClick={handleConfirm}
						className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm "
					>
						Sign Out
					</button>
				</div>
			</div>
		</div>
	);
}
