import {
	getDoc,
	getDocs,
	query,
	where,
	collection,
	orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getSaveTag(usRef, setSaveTagData, showAlert) {
	try {
		// 🧠 Fetch all in parallel
		const userPromise = getDoc(usRef);

		const projectPromise = getDocs(
			query(
				collection(db, "projects"),
				where("pr_usID", "==", usRef),
				orderBy("pr_date", "desc")
			)
		);

		const achievementPromise = getDocs(
			query(
				collection(db, "achievements"),
				where("ac_usID", "==", usRef),
				orderBy("ac_date", "desc")
			)
		);

		const [userSnap, projectSnap, achievementSnap] = await Promise.all([
			userPromise,
			projectPromise,
			achievementPromise,
		]);

		// 👤 USER DATA
		let userSaveTag = {};
		if (userSnap.exists()) {
			const data = userSnap.data();
			userSaveTag = {
				about: data.us_about || "",
				technology: data.us_technology || [],
				gallery: data.us_gallery || [],
			};
		}

		// 🚀 PROJECT DATA (ordered by pr_date desc)
		const projectSaveTag = projectSnap.docs.map((doc) => {
			const data = doc.data();
			return {
				title: data.pr_title || "",
				description: data.pr_description || "",
				technology: data.pr_technology || [],
				url: data.pr_url || "",
				photo: data.pr_photoURL || "",
				date: data.pr_date?.toDate?.().toDateString?.() || "",
			};
		});

		// 🏆 ACHIEVEMENTS DATA (ordered by ac_date desc)
		const achievementSaveTag = achievementSnap.docs.map((doc) => {
			const data = doc.data();
			return {
				title: data.ac_title || "",
				photo: data.ac_photoURL || "",
				date: data.ac_date?.toDate?.().toDateString?.() || "",
			};
		});

		// 🧩 COMBINE ALL DATA
		const combinedSaveTag = `
👤 User Info, Technology, Gallery:
${JSON.stringify(userSaveTag, null, 2)}

🚀 Projects:
${JSON.stringify(projectSaveTag, null, 2)}

🏆 Achievements:
${JSON.stringify(achievementSaveTag, null, 2)}
`;

		setSaveTagData?.(combinedSaveTag);
		return combinedSaveTag;
	} catch (error) {
		console.error(error.message);
		showAlert?.(error?.message || "Something went wrong.", "danger");
		return "";
	}
}
