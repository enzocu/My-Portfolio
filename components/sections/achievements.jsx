export default function AchievementsSection() {
	const achievements = [
		{
			date: "18 Dec, 2024",
			type: "Dean's List",
			certificate: "/mobile-app-first-aid.jpg",
		},
		{
			date: "15 Nov, 2024",
			type: "Google Developer Groups - Web Development",
			certificate: "/mobile-app-first-aid.jpg",
		},
		{
			date: "10 Oct, 2024",
			type: "Mobile App Development Excellence",
			certificate: "/mobile-app-first-aid.jpg",
		},
		{
			date: "05 Sep, 2024",
			type: "Full Stack Development Certification",
			certificate: "/mobile-app-first-aid.jpg",
		},
	];

	return (
		<section id="achievements" className="scroll-mt-20">
			<h2 className="text-2xl lg:text-3xl font-bold text-purple-500 mb-6">
				Achievements
			</h2>
			<div className="space-y-4">
				{achievements.map((achievement, index) => (
					<div
						key={index}
						className="flex flex-col-reverse sm:flex-row items-start gap-4 p-4 rounded-lg border border-border/50 hover:border-purple-500/50 hover:bg-muted/30 transition-all duration-200"
					>
						<div className="w-58 h-32 sm:w-40 sm:h-24 flex-shrink-0  rounded-lg overflow-hidden border border-border bg-muted ">
							<img
								src={achievement.certificate || "/placeholder.svg"}
								alt={achievement.type}
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-xs text-muted-foreground uppercase tracking-wide">
								{achievement.date}
							</p>
							<p className="text-lg font-medium text-foreground mt-1">
								{achievement.type}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
