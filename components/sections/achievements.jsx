"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "@/contexts/user-context";
import { getAchievements } from "@/controller/get/getAchievements";
import { useAlert } from "@/contexts/alert-context";

export default function AchievementsSection() {
	const { userRef } = useUserAuth();
	const { showAlert } = useAlert();
	const [achievementsData, setAchievementsData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [limitValue, setLimitValue] = useState(3);

	useEffect(() => {
		let unsubscribe;
		if (userRef) {
			unsubscribe = getAchievements(
				userRef,
				setAchievementsData,
				limitValue,
				setLoading,
				showAlert
			);
		}
		return () => unsubscribe && unsubscribe();
	}, [userRef, limitValue]);

	const handleToggleLimit = () => {
		setLimitValue((prev) => (prev === 3 ? 20 : 3));
	};

	return (
		<section id="achievements" className="scroll-mt-20">
			<h2 className="text-2xl lg:text-3xl font-bold text-blue-700 mb-6">
				Achievements
			</h2>

			{loading ? (
				<div className="space-y-4">
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-lg border border-border/50 animate-pulse"
						>
							<div className="w-58 h-32 sm:w-40 sm:h-24 rounded-lg bg-muted" />
							<div className="flex-1 space-y-3">
								<div className="w-1/3 h-4 bg-muted rounded" />
								<div className="w-2/3 h-3 bg-muted rounded" />
							</div>
						</div>
					))}
				</div>
			) : achievementsData.length === 0 ? (
				<p className="text-muted-foreground text-sm">
					No achievements registered.
				</p>
			) : (
				<div className="space-y-4">
					{achievementsData.map((achievement, index) => (
						<div
							key={index}
							className="flex flex-col-reverse sm:flex-row items-start gap-4 p-4 rounded-lg border border-border/50 hover:border-blue-700/30 hover:bg-muted/30 transition-all duration-200 group"
						>
							<div className="w-58 h-32 sm:w-40 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden border border-border bg-muted group-hover:border-blue-700 transition-colors duration-300">
								<img
									src={achievement.ac_photoURL || "/placeholder.svg"}
									alt={achievement.ac_title}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-xs text-muted-foreground uppercase tracking-wide">
									{achievement.ac_date}
								</p>
								<p className="text-lg font-medium text-foreground mt-1 transition-colors">
									{achievement.ac_title}
								</p>
							</div>
						</div>
					))}
				</div>
			)}

			{!loading &&
				achievementsData.length > 3 &&
				achievementsData.length > 0 && (
					<button
						onClick={handleToggleLimit}
						className="mt-6 py-2 text-blue-700 hover:text-blue-600 font-medium transition-all duration-300 hover:translate-x-1 flex items-center gap-2"
					>
						{limitValue === 3 ? "View All" : "View Less"}
						<span className="text-lg">›</span>
					</button>
				)}
		</section>
	);
}
