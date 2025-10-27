"use client";

import { useUserAuth } from "@/contexts/user-context";
import { AVAILABLE_TECHNOLOGIES } from "@/components/dialogs/technologies-list";

export default function TechnologiesSection() {
	const { userDetails } = useUserAuth();
	const userTechs = userDetails?.us_technology || [];

	return (
		<section id="technologies" className="scroll-mt-28">
			<h2 className="text-2xl lg:text-3xl font-bold text-blue-700 mb-6">
				Technologies
			</h2>

			{userTechs.length === 0 ? (
				<p className="text-muted-foreground text-sm">
					No technologies registered.
				</p>
			) : (
				<div className="flex flex-wrap gap-3">
					{userTechs.map((techName) => {
						const match = AVAILABLE_TECHNOLOGIES.find(
							(t) =>
								t.name.toLowerCase().trim() === techName.toLowerCase().trim()
						);

						const IconComponent = match?.icon;

						return (
							<div
								key={techName}
								className="px-4 py-2 bg-blue-700/5 border border-blue-700/40 rounded-4xl text-sm font-medium text-blue-600 hover:bg-blue-700/20 transition-colors flex items-center gap-2"
							>
								{IconComponent && <IconComponent size={18} />}
								{techName}
							</div>
						);
					})}
				</div>
			)}
		</section>
	);
}
