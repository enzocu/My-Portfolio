"use client";

import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import authAnimation from "@/public/lottie/authLoading.json";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAlert } from "@/contexts/alert-context";

const FALLBACK_UID = process.env.NEXT_PUBLIC_FALLBACK_UID;
const UserContextAuth = createContext(undefined);

export function UserContextAuthProvider({ children }) {
	const router = useRouter();
	const { showAlert } = useAlert();

	const [user, setUser] = useState(null);
	const [userDetails, setUserDetails] = useState(null);
	const [userRef, setUserRef] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let unsubscribeUserDoc = () => {};

		const subscribeToUserDoc = (uid, isCurrentUser) => {
			const ref = doc(db, "users", uid);
			setUserRef(ref);

			return onSnapshot(
				ref,
				(docSnap) => {
					if (docSnap.exists()) {
						setUserDetails({
							...docSnap.data(),
							isCurrentUser,
						});
					} else {
						showAlert("User document not found.", "error");
						setUserDetails(null);
					}
					setLoading(false);
				},
				(error) => {
					showAlert("Error fetching user details: " + error.message, "error");
					setUserDetails(null);
					setLoading(false);
					router.push("/");
				}
			);
		};

		const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
			unsubscribeUserDoc();
			setUser(currentUser);
			setLoading(true);

			if (currentUser) {
				unsubscribeUserDoc = subscribeToUserDoc(currentUser.uid, true);
			} else {
				unsubscribeUserDoc = subscribeToUserDoc(FALLBACK_UID, false);
			}
		});

		return () => {
			unsubscribeAuth();
			unsubscribeUserDoc();
		};
	}, [router, showAlert]);

	return (
		<UserContextAuth.Provider value={{ user, userDetails, userRef, loading }}>
			{loading ? (
				<div className="flex items-center justify-center h-screen w-full bg-background">
					<Lottie animationData={authAnimation} loop className="w-60 h-60" />
				</div>
			) : (
				children
			)}
		</UserContextAuth.Provider>
	);
}

export function useUserAuth() {
	const context = useContext(UserContextAuth);
	if (!context) {
		throw new Error("useUserAuth must be used within UserContextAuthProvider");
	}
	return context;
}
