import {
	onSnapshot,
	query,
	where,
	orderBy,
	limit as limitFn,
	collection,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatFirestoreDate } from "@/lib/util";

export function getAchievements(
	usRef,
	setAchievementData,
	limit,
	setLoading,
	showAlert
) {
	setLoading(true);
	try {
		const achievementsRef = collection(db, "achievements");

		const q = query(
			achievementsRef,
			where("ac_usID", "==", usRef),
			orderBy("ac_date", "desc"),
			limitFn(limit)
		);

		// ✅ Return the unsubscribe function directly
		const unsubscribe = onSnapshot(
			q,
			(snapshot) => {
				const achievements = snapshot.docs.map((doc) => {
					const data = doc.data();
					return {
						id: doc.id,
						ac_title: data.ac_title || "",
						ac_photoURL: data.ac_photoURL || "",
						ac_date: formatFirestoreDate(data.ac_date),
					};
				});
				setAchievementData(achievements);
				setLoading(false);
			},
			(error) => {
				showAlert?.(error?.message || "Something went wrong.", "danger");
				console.log(error.message);
				setLoading(false);
			}
		);

		return unsubscribe; // ✅ so useEffect cleanup can call it
	} catch (error) {
		showAlert?.(error?.message || "Something went wrong.", "danger");
		setLoading(false);
		return () => {}; // ✅ ensure always returns a function
	}
}
