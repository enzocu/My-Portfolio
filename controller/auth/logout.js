import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const handleLogout = async (setBtnLoading, showAlert, onClose) => {
	try {
		setBtnLoading(true);

		await signOut(auth);

		showAlert?.("Logout successful! See you soon, Lawrence.", "success");
	} catch (error) {
		let errorMessage = "Logout failed. Please try again.";
		if (error.code === "auth/network-request-failed") {
			errorMessage =
				"Network error. Please check your connection and try again.";
		}

		showAlert?.(errorMessage, "danger");
	} finally {
		setBtnLoading(false);
		onClose();
	}
};
