"use client";

import {
	updateDoc,
	addDoc,
	doc,
	collection,
	serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Timestamp } from "firebase/firestore";

export const saveProject = async ({
	userRef,
	projectData = null,
	formData,
	setBtnLoading,
	showAlert,
	onClose,
}) => {
	try {
		setBtnLoading(true);

		let imageURL = formData.picture;

		if (formData.picture && typeof formData.picture !== "string") {
			const imageRef = ref(
				storage,
				`projects/${userRef.id}_${Date.now()}_${formData.picture.name}`
			);
			const snapshot = await uploadBytes(imageRef, formData.picture);
			imageURL = await getDownloadURL(snapshot.ref);
		}

		const projectPayload = {
			pr_title: formData.title,
			pr_description: formData.about,
			pr_date: formData.date
				? Timestamp.fromDate(new Date(formData.date))
				: null,
			pr_technology: formData.technologies,
			pr_photoURL: imageURL || "",
			pr_url: formData.url || "",
			pr_usID: userRef,
			pr_timestamp: serverTimestamp(),
		};

		if (projectData && projectData.id) {
			const projectRef = doc(db, "projects", projectData.id);
			await updateDoc(projectRef, projectPayload);
			showAlert?.("Project updated successfully!", "success");
		} else {
			await addDoc(collection(db, "projects"), projectPayload);
			showAlert?.("Project added successfully!", "success");
		}

		onClose?.();
	} catch (error) {
		console.error("Error saving project:", error);
		showAlert?.(error.message || "Failed to save project.", "danger");
	} finally {
		setBtnLoading(false);
	}
};
