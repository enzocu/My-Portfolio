"use client";

import { useAlert } from "@/contexts/alert-context";
import { X } from "lucide-react";

export default function AlertContainer() {
	const { alerts, removeAlert } = useAlert();

	const getAlertStyles = (type) => {
		switch (type) {
			case "success":
				return "bg-green-50 border-green-200 text-green-800";
			case "danger":
				return "bg-red-50 border-red-200 text-red-800";
			case "warning":
				return "bg-yellow-50 border-yellow-200 text-yellow-800";
			default:
				return "bg-blue-50 border-blue-200 text-blue-800";
		}
	};

	return (
		<div className="fixed top-4 right-4 z-[9999] space-y-2 max-w-sm">
			{alerts.map((alert) => (
				<div
					key={alert.id}
					className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg border ${getAlertStyles(
						alert.type
					)} animate-in fade-in slide-in-from-top-2 duration-300`}
				>
					<p className="text-sm font-medium">{alert.message}</p>
					<button
						onClick={() => removeAlert(alert.id)}
						className="flex-shrink-0 hover:opacity-70 transition-opacity"
						aria-label="Close alert"
					>
						<X className="w-4 h-4" />
					</button>
				</div>
			))}
		</div>
	);
}
