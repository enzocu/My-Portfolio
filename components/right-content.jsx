"use client";

import { useEffect, useRef } from "react";
import AboutSection from "./sections/about";
import TechnologiesSection from "./sections/technologies";
import ProjectsSection from "./sections/projects";
import AchievementsSection from "./sections/achievements";
import ImageCarousel from "./sections/image-carousel";
import BuiltWithSection from "./sections/built-with";

export default function RightContent({ onSectionChange }) {
	const containerRef = useRef(null);

	useEffect(() => {
		const handleScroll = () => {
			if (!containerRef.current) return;

			const sections = [
				"about",
				"technologies",
				"projects",
				"achievements",
				"gallery",
			];
			const scrollPosition = containerRef.current.scrollTop + 230;

			for (const section of sections) {
				const element = document.getElementById(section);
				if (element) {
					const { offsetTop, offsetHeight } = element;
					if (
						scrollPosition >= offsetTop &&
						scrollPosition < offsetTop + offsetHeight
					) {
						onSectionChange(section);
						break;
					}
				}
			}
		};

		const container = containerRef.current;
		if (container) {
			container.addEventListener("scroll", handleScroll);
			return () => container.removeEventListener("scroll", handleScroll);
		}
	}, [onSectionChange]);

	return (
		<>
			<div
				ref={containerRef}
				className="w-full h-auto lg:h-screen flex flex-col justify-between lg:pt-28 pb-6 overflow-y-auto hide-scrollbar"
			>
				<div className="space-y-16 lg:space-y-24">
					<AboutSection />
					<TechnologiesSection />
					<ProjectsSection />
					<AchievementsSection />
					<ImageCarousel />
					<BuiltWithSection />
				</div>
			</div>
		</>
	);
}
