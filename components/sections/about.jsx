"use client";

import { useUserAuth } from "@/contexts/user-context";

export default function AboutSection() {
	const { userDetails } = useUserAuth();

	return (
		<section id="about" className="scroll-mt-28">
			<h2 className="lg:hidden text-2xl lg:text-3xl font-bold text-blue-700 mb-5">
				About
			</h2>

			<p className="text-muted-foreground leading-relaxed text-base whitespace-pre-wrap">
				{userDetails?.us_about ||
					`I was born on August 3, 2004, in Barit, Candaba, Pampanga, Philippines,
					as the third of four siblings. Growing up in a close-knit family, I
					learned the value of love, resilience, and supporting one another
					through life's ups and downs.`}
			</p>
		</section>
	);
}
