"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/header";
import LeftSidebar from "@/components/left-sidebar";
import RightContent from "@/components/right-content";
import ChatButton from "@/components/chat-button";
import RecommendationBox from "@/components/recommendation-box";

export default function Home() {
	const [activeSection, setActiveSection] = useState("about");
	const [isDark, setIsDark] = useState(false);
	const rightContentRef = useRef(null);

	useEffect(() => {
		const isDarkMode = document.documentElement.classList.contains("dark");
		setIsDark(isDarkMode);
	}, []);

	const toggleDarkMode = () => {
		const html = document.documentElement;
		html.classList.toggle("dark");
		setIsDark(!isDark);
	};

	const scrollToSection = (sectionId) => {
		setActiveSection(sectionId);
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className={isDark ? "dark" : ""}>
			<div className="max-w-[1250px] mx-auto px-6">
				<Header isDark={isDark} onToggleDarkMode={toggleDarkMode} />
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-auto lg:h-screen overflow-hidden bg-background text-foreground">
					<LeftSidebar
						activeSection={activeSection}
						onSectionClick={scrollToSection}
					/>

					<RightContent
						ref={rightContentRef}
						onSectionChange={setActiveSection}
					/>
				</div>

				<ChatButton />
				<RecommendationBox />
			</div>
		</div>
	);
}
