import {
	FiCode,
	FiServer,
	FiLayout,
	FiCpu,
	FiBox,
	FiSmartphone,
	FiZap,
	FiDroplet,
	FiDatabase,
	FiSliders,
} from "react-icons/fi";

export default function TechnologiesSection() {
	const technologies = [
		{ name: "JavaScript", icon: FiCode },
		{ name: "PHP", icon: FiServer },
		{ name: "HTML", icon: FiLayout },
		{ name: "CSS", icon: FiSliders },
		{ name: "Java", icon: FiCpu },
		{ name: "Bootstrap", icon: FiBox },
		{ name: "Flutter", icon: FiSmartphone },
		{ name: "Firebase", icon: FiZap },
		{ name: "Tailwind CSS", icon: FiDroplet },
		{ name: "MySQL", icon: FiDatabase },
	];

	return (
		<section id="technologies" className="scroll-mt-28">
			<h2 className="text-2xl lg:text-3xl font-bold text-purple-500 mb-6">
				Technologies
			</h2>
			<div className="flex flex-wrap gap-3">
				{technologies.map((tech) => {
					const IconComponent = tech.icon;
					return (
						<div
							key={tech.name}
							className="px-4 py-2 bg-purple-500/5 border border-purple-500/30 rounded-4xl text-sm font-medium text-purple-400 hover:bg-purple-500/20 transition-colors flex items-center gap-2"
						>
							<IconComponent size={18} />
							{tech.name}
						</div>
					);
				})}
			</div>
		</section>
	);
}
