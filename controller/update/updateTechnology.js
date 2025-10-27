"use client";

import { updateDoc } from "firebase/firestore";

export const updateTechnology = async (
	userRef,
	registeredTechnologies = [],
	technology = [],
	setBtnLoading,
	showAlert,
	onClose
) => {
	try {
		setBtnLoading(true);

		const updatedTechnologies = Array.from(
			new Set([...registeredTechnologies, ...technology])
		);

		await updateDoc(userRef, {
			us_technology: updatedTechnologies,
		});

		showAlert?.("Technology updated successfully!", "success");
	} catch (error) {
		console.error("Error updating technology:", error);
		showAlert?.(error.message || "Failed to update technology.", "danger");
	} finally {
		setBtnLoading(false);
		onClose?.();
	}
};
