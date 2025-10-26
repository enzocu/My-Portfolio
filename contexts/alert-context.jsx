"use client";

import { createContext, useContext, useState, useCallback } from "react";

const AlertContext = createContext();

export function AlertProvider({ children }) {
	const [alerts, setAlerts] = useState([]);

	const showAlert = useCallback(
		(message, type = "success", duration = 3000) => {
			const id = Date.now();
			const alert = { id, message, type };

			setAlerts((prev) => [...prev, alert]);

			if (duration > 0) {
				setTimeout(() => {
					setAlerts((prev) => prev.filter((a) => a.id !== id));
				}, duration);
			}

			return id;
		},
		[]
	);

	const removeAlert = useCallback((id) => {
		setAlerts((prev) => prev.filter((a) => a.id !== id));
	}, []);

	return (
		<AlertContext.Provider value={{ showAlert, removeAlert, alerts }}>
			{children}
		</AlertContext.Provider>
	);
}

export function useAlert() {
	const context = useContext(AlertContext);
	if (!context) {
		throw new Error("useAlert must be used within AlertProvider");
	}
	return context;
}
