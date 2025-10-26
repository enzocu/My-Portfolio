"use client";

import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ isDark, onToggleDarkMode }) {
	return (
		<button
			onClick={onToggleDarkMode}
			className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-muted/80 transition-colors"
			aria-label="Toggle dark mode"
		>
			{isDark ? (
				<Moon className="w-5 h-5 text-foreground transition-opacity duration-300 " />
			) : (
				<Sun className="w-5 h-5 text-foreground transition-opacity duration-300" />
			)}
		</button>
	);
}
