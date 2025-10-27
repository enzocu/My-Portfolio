"use client";

import {
	updateDoc,
	addDoc,
	doc,
	collection,
	serverTimestamp,
	Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

export const saveAchievement = async ({
	userRef,
	achievementData = null,
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
				`achievements/${userRef.id}_${Date.now()}_${formData.picture.name}`
			);
			const snapshot = await uploadBytes(imageRef, formData.picture);
			imageURL = await getDownloadURL(snapshot.ref);
		}

		const achievementPayload = {
			ac_title: formData.title,
			ac_date: formData.date
				? Timestamp.fromDate(new Date(formData.date))
				: null,
			ac_photoURL: imageURL || "",
			ac_usID: userRef,
			ac_timestamp: serverTimestamp(),
		};

		if (achievementData && achievementData.id) {
			const achievementRef = doc(db, "achievements", achievementData.id);
			await updateDoc(achievementRef, achievementPayload);
			showAlert?.("Achievement updated successfully!", "success");
		} else {
			await addDoc(collection(db, "achievements"), achievementPayload);
			showAlert?.("Achievement added successfully!", "success");
		}

		onClose?.();
	} catch (error) {
		console.error("Error saving achievement:", error);
		showAlert?.(error.message || "Failed to save achievement.", "danger");
	} finally {
		setBtnLoading(false);
	}
};
