import { updateDoc } from "firebase/firestore";
import {
	ref,
	uploadBytes,
	getDownloadURL,
	deleteObject,
} from "firebase/storage";
import { storage } from "@/lib/firebase";

export const updateGallery = async (
	userRef,
	newImage = null,
	registeredImages = [],
	deleteImage = null,
	setBtnLoading,
	showAlert,
	onClose
) => {
	try {
		setBtnLoading(true);

		if (deleteImage) {
			try {
				const path = deleteImage.replace(`${storage.baseUrl}/`, "");
				await deleteObject(ref(storage, path));
			} catch (err) {
				console.warn("Failed to delete image:", deleteImage, err);
			}
		}

		let uploadedURL = null;
		if (newImage) {
			try {
				const fileRef = ref(
					storage,
					`users/${userRef.id}/gallery/${Date.now()}-${newImage.name}`
				);
				await uploadBytes(fileRef, newImage);
				uploadedURL = await getDownloadURL(fileRef);
			} catch (err) {
				console.warn("Failed to upload new image:", newImage.name, err);
			}
		}

		const updatedGallery = [
			...registeredImages.filter((img) => img !== deleteImage),
			...(uploadedURL ? [uploadedURL] : []),
		];

		await updateDoc(userRef, { us_gallery: updatedGallery });
		showAlert?.("Gallery updated successfully!", "success");
	} catch (error) {
		console.error("Error updating gallery:", error);
		showAlert?.(error.message || "Failed to update gallery.", "danger");
	} finally {
		setBtnLoading(false);
		onClose?.();
	}
};
