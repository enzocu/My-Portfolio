export function formatFirestoreDate(timestamp) {
	if (!timestamp) return "";

	const dateObj = timestamp?.toDate ? timestamp.toDate() : null;
	if (!dateObj) return "";

	return dateObj.toLocaleDateString("en-US", {
		month: "short",
		day: "2-digit",
		year: "numeric",
	});
}
