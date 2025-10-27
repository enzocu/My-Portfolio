"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "@/contexts/user-context";
import { getProjects } from "@/controller/get/getProjects";
import { useAlert } from "@/contexts/alert-context";

export default function ProjectsSection() {
	const { userRef } = useUserAuth();
	const { showAlert } = useAlert();
	const [projectsData, setProjectsData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [limitValue, setLimitValue] = useState(3);

	useEffect(() => {
		let unsubscribe;
		if (userRef) {
			unsubscribe = getProjects(
				userRef,
				setProjectsData,
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
		<section id="projects" className="scroll-mt-28">
			<h2 className="text-2xl lg:text-3xl font-bold text-blue-700 mb-6">
				Projects
			</h2>

			{/* 🌀 Loading shimmer */}
			{loading ? (
				<div className="space-y-6">
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-border animate-pulse"
						>
							<div className="w-58 h-32 sm:w-40 sm:h-24 rounded-lg bg-muted" />
							<div className="flex-1 space-y-3">
								<div className="w-1/3 h-4 bg-muted rounded" />
								<div className="w-full h-3 bg-muted rounded" />
								<div className="w-2/3 h-3 bg-muted rounded" />
								<div className="flex gap-2 mt-3">
									<div className="w-14 h-5 bg-muted rounded-3xl" />
									<div className="w-14 h-5 bg-muted rounded-3xl" />
								</div>
							</div>
						</div>
					))}
				</div>
			) : projectsData.length === 0 ? (
				// 🚫 Empty state
				<p className="text-muted-foreground text-sm">No projects registered.</p>
			) : (
				<div className="space-y-6">
					{projectsData.map((project, index) => (
						<div
							key={index}
							className="flex flex-col-reverse sm:flex-row gap-6 pb-6 border-b border-border last:border-b-0 group cursor-pointer"
							onClick={() =>
								project.pr_url &&
								window.open(project.pr_url, "_blank", "noopener,noreferrer")
							}
						>
							<div className="w-58 h-32 sm:w-40 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden border border-border group-hover:border-blue-700 transition-colors duration-300">
								<img
									src={project.pr_photoURL || "/placeholder.svg"}
									alt={project.pr_title}
									className="w-full h-full object-cover"
								/>
							</div>

							<div className="flex-1">
								<div className="flex items-start justify-between mb-1">
									<h3 className="text-xl font-semibold  transition-colors">
										{project.pr_title}
									</h3>
									<span className="text-xs text-muted-foreground">
										{project.pr_date}
									</span>
								</div>
								<p className="text-base text-muted-foreground mb-4 leading-relaxed">
									{project.pr_description}
								</p>
								<div className="flex flex-wrap gap-2">
									{project.pr_technology.map((tech, idx) => (
										<span
											key={idx}
											className="px-3 py-1 bg-blue-700/5 border border-blue-700/40 rounded-4xl text-xs font-medium text-blue-600"
										>
											{tech}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{/* 🔘 Toggle button */}
			{!loading && projectsData.length > 3 && projectsData.length > 0 && (
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
