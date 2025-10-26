export default function ProjectsSection() {
	const projects = [
		{
			title: "AidMate",
			date: "07 Jan, 2025",
			description:
				"Is a mobile app designed to provide essential first aid guidance and help users find nearby medical services. It features an emergency button to send alerts to contacts and connect users to the nearest hospital.",
			technologies: ["Flutter", "Firebase"],
			image: "/mobile-app-first-aid.jpg",
		},
		{
			title: "FixMyRoad 2.0",
			date: "11 Nov, 2024",
			description:
				"Is an enhanced version of the road damage reporting platform, offering an interactive map with location pins for reported damage.",
			technologies: ["JavaScript", "PHP", "HTML", "CSS", "Bootstrap", "MySQL"],
			image: "/road-damage-reporting-app.jpg",
		},
		{
			title: "BSCS Information System",
			date: "28 Oct, 2024",
			description:
				"Manages student data, grades, and faculty operations. It includes a Calendar of Activities for teachers and staff, streamlines grade entry and report generation, and offers features for creating forms like SF10 and Good Moral certificates.",
			technologies: ["JavaScript", "PHP", "HTML", "CSS", "Bootstrap", "MySQL"],
			image: "/information-management-system.jpg",
		},
	];

	return (
		<section id="projects" className="scroll-mt-28">
			<h2 className="text-2xl lg:text-3xl font-bold text-purple-500 mb-6">
				Projects
			</h2>
			<div className="space-y-6">
				{projects.map((project, index) => (
					<div
						key={index}
						className="flex flex-col-reverse sm:flex-row gap-6 pb-6 border-b border-border last:border-b-0"
					>
						<div className="w-58 h-32 sm:w-40 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden border border-border  transition-colors duration-300">
							<img
								src={project.image || "/placeholder.svg"}
								alt={project.title}
								className="w-full h-full object-cover"
							/>
						</div>

						<div className="flex-1">
							<div className="flex items-start justify-between mb-1">
								<h3 className="text-xl font-semibold">{project.title}</h3>
								<span className="text-xs text-muted-foreground">
									{project.date}
								</span>
							</div>
							<p className="text-base text-muted-foreground mb-4 leading-relaxed">
								{project.description}
							</p>
							<div className="flex flex-wrap gap-2">
								{project.technologies.map((tech) => (
									<span
										key={tech}
										className="px-3 py-1 bg-purple-500/5 border border-purple-500/30 rounded-4xl text-xs font-medium text-purple-400"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
			<button className="mt-6  py-2 text-purple-500 hover:text-purple-400 font-medium transition-all duration-300 hover:translate-x-1 flex items-center gap-2">
				View less
				<span className="text-lg">›</span>
			</button>
		</section>
	);
}
