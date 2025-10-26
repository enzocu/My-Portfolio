"use client";

import { MessageCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ChatDialog from "./dialogs/chat-dialog";

export default function ChatButton() {
	const [isOpen, setIsOpen] = useState(false);
	const buttonRef = useRef(null);
	const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

	useEffect(() => {
		const updatePosition = () => {
			if (buttonRef.current) {
				const rect = buttonRef.current.getBoundingClientRect();
				setButtonPosition({
					top: rect.top + window.scrollY,
					left: rect.left + window.scrollX,
				});
			}
		};

		updatePosition();
		window.addEventListener("resize", updatePosition);
		window.addEventListener("scroll", updatePosition);

		return () => {
			window.removeEventListener("resize", updatePosition);
			window.removeEventListener("scroll", updatePosition);
		};
	}, []);

	return (
		<>
			<button
				ref={buttonRef}
				onClick={() => setIsOpen(!isOpen)}
				className="fixed bottom-8 right-8 z-40 flex items-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors "
			>
				<MessageCircle className="w-5 h-5 relative z-10 animate-wave" />
				<span className="text-sm relative z-10">Chat with Lawrence</span>
			</button>

			<ChatDialog
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				buttonPosition={buttonPosition}
			/>
		</>
	);
}
