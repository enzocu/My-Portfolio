"use client";

import { Github, Mail, Facebook, Instagram } from "lucide-react";
import { useEffect, useState } from "react";

export default function LeftSidebar({ activeSection, onSectionClick }) {
	const [isDark, setIsDark] = useState(false);
	const sections = ["about", "technologies", "projects", "achievements"];

	useEffect(() => {
		const isDarkMode = document.documentElement.classList.contains("dark");
		setIsDark(isDarkMode);

		const observer = new MutationObserver(() => {
			setIsDark(document.documentElement.classList.contains("dark"));
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});
		return () => observer.disconnect();
	}, []);

	return (
		<div className="w-full h-auto lg:h-screen flex flex-col justify-between pt-28 pb-6 ">
			{/* Header Section */}
			<div>
				<h1 className="text-4xl lg:text-5xl font-bold mb-2">
					Lawrence S. Cunanan
				</h1>
				<p className="text-lg lg:text-2xl text-muted-foreground mb-2">
					Web Development Lead
				</p>
				<p className="text-base text-muted-foreground mb-8 lg:mb-12">
					Google Developer Groups on Campus
				</p>

				{/* Navigation Menu */}
				<nav className="space-y-4 lg:space-y-6">
					{sections.map((section) => (
						<button
							key={section}
							onClick={() => onSectionClick(section)}
							className={`hidden lg:flex items-center gap-3 text-lg  transition-all duration-300 group ${
								activeSection === section
									? "text-foreground font-semibold"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							<span
								className={`transition-all duration-300 ${
									activeSection === section
										? "w-12 h-0.5 bg-foreground"
										: "w-6 h-px bg-muted-foreground"
								}`}
							/>
							<span>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
						</button>
					))}
				</nav>
			</div>

			{/* Social Icons */}
			<div className="flex gap-6">
				<a
					href="#"
					className={`text-muted-foreground transition-colors ${
						isDark ? "hover:text-blue-400" : "hover:text-blue-600"
					}`}
					aria-label="GitHub"
				>
					<Github className="w-5 h-5 lg:w-6 lg:h-6" />
				</a>
				<a
					href="#"
					className={`text-muted-foreground transition-colors ${
						isDark ? "hover:text-red-400" : "hover:text-red-600"
					}`}
					aria-label="Email"
				>
					<Mail className="w-5 h-5 lg:w-6 lg:h-6" />
				</a>
				<a
					href="#"
					className={`text-muted-foreground transition-colors ${
						isDark ? "hover:text-blue-500" : "hover:text-blue-700"
					}`}
					aria-label="Facebook"
				>
					<Facebook className="w-5 h-5 lg:w-6 lg:h-6" />
				</a>
				<a
					href="#"
					className={`text-muted-foreground transition-colors ${
						isDark ? "hover:text-pink-400" : "hover:text-pink-600"
					}`}
					aria-label="Instagram"
				>
					<Instagram className="w-5 h-5 lg:w-6 lg:h-6" />
				</a>
			</div>
		</div>
	);
}
