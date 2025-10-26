"use client";

import { useState, useEffect, useRef } from "react";
import { AlertCircle } from "lucide-react";

export default function RecommendationBox() {
	const recommendations = [
		"Master React Server Components for better performance and SEO.",
		"Use TypeScript to catch errors early and improve code quality.",
		"Implement proper error handling in your API routes.",
		"Optimize images with Next.js Image component for faster loading.",
		"Use environment variables to secure sensitive data.",
		"Write unit tests to ensure code reliability.",
		"Keep your dependencies updated for security patches.",
		"Use CSS-in-JS or Tailwind for scalable styling.",
	];

	const [currentIndex, setCurrentIndex] = useState(0);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
	const [isVisible, setIsVisible] = useState(true);
	const boxRef = useRef(null);
	const lastTapRef = useRef(0);

	useEffect(() => {
		setPosition({ x: window.innerWidth - 340, y: 80 });
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % recommendations.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [recommendations.length]);

	const startDrag = (x, y) => {
		if (boxRef.current) {
			const rect = boxRef.current.getBoundingClientRect();
			setDragOffset({ x: x - rect.left, y: y - rect.top });
			setIsDragging(true);
		}
	};

	const handleMouseDown = (e) => startDrag(e.clientX, e.clientY);
	const handleTouchStart = (e) => {
		const touch = e.touches[0];
		startDrag(touch.clientX, touch.clientY);
	};

	const handleDoubleClick = () => {
		setIsVisible(false);
	};

	const handleTouchEnd = () => {
		const now = Date.now();
		if (now - lastTapRef.current < 300) {
			// double tap detected
			setIsVisible(false);
		}
		lastTapRef.current = now;
		setIsDragging(false);
	};

	useEffect(() => {
		const handleMove = (x, y) => {
			if (isDragging) {
				setPosition({ x: x - dragOffset.x, y: y - dragOffset.y });
			}
		};

		const handleMouseMove = (e) => handleMove(e.clientX, e.clientY);
		const handleTouchMove = (e) => {
			const touch = e.touches[0];
			handleMove(touch.clientX, touch.clientY);
		};

		const handleEnd = () => setIsDragging(false);

		if (isDragging) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleEnd);
			document.addEventListener("touchmove", handleTouchMove);
			document.addEventListener("touchend", handleEnd);
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleEnd);
			document.removeEventListener("touchmove", handleTouchMove);
			document.removeEventListener("touchend", handleEnd);
		};
	}, [isDragging, dragOffset]);

	if (!isVisible) return null;

	return (
		<div
			ref={boxRef}
			className="fixed w-80 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30 rounded-lg p-4 shadow-lg backdrop-blur-sm z-50 transition-shadow duration-200"
			style={{
				top: `${position.y}px`,
				left: `${position.x}px`,
				cursor: isDragging ? "grabbing" : "grab",
				touchAction: "none", // important for mobile dragging
			}}
			onDoubleClick={handleDoubleClick} // desktop double click
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd} // mobile double tap
			onMouseDown={handleMouseDown}
		>
			<div className="flex items-start gap-3" style={{ cursor: "grab" }}>
				<AlertCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
				<div className="flex-1">
					<h3 className="text-sm font-semibold text-purple-500 mb-1">
						Tech Tip
					</h3>
					<p className="text-sm text-muted-foreground leading-relaxed">
						{recommendations[currentIndex]}
					</p>
					<div className="flex gap-1 mt-3">
						{recommendations.map((_, index) => (
							<div
								key={index}
								className={`h-1 rounded-full transition-all duration-300 ${
									index === currentIndex
										? "w-6 bg-purple-500"
										: "w-1 bg-purple-500/30"
								}`}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
