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

export function getProjects(
	usRef,
	setProjectData,
	limit,
	setLoading,
	showAlert
) {
	setLoading(true);

	try {
		const projectsRef = collection(db, "projects");

		const q = query(
			projectsRef,
			where("pr_usID", "==", usRef),
			orderBy("pr_date", "desc"),
			limitFn(limit)
		);

		const unsubscribe = onSnapshot(
			q,
			(snapshot) => {
				const projects = snapshot.docs.map((doc) => {
					const data = doc.data();

					return {
						id: doc.id,
						pr_title: data.pr_title || "",
						pr_description: data.pr_description || "",
						pr_photoURL: data.pr_photoURL || "",
						pr_url: data.pr_url || "",
						pr_technology: data.pr_technology || [],
						pr_date: formatFirestoreDate(data.pr_date),
					};
				});

				setProjectData(projects);
				setLoading(false);
			},
			(error) => {
				showAlert?.(error?.message || "Something went wrong.", "danger");
				console.log(error.message);
				setLoading(false);
			}
		);

		return unsubscribe;
	} catch (error) {
		console.log(error.message);
		showAlert?.(error?.message || "Something went wrong.", "danger");
		setLoading(false);

		return () => {};
	}
}
