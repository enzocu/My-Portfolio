"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function ChatDialog({ isOpen, onClose, buttonPosition }) {
	const [messages, setMessages] = useState([
		{
			id: 1,
			type: "bot",
			text: "Hi! I'm Lawrence. Feel free to ask me about my projects, experience, or anything else you'd like to know!",
		},
	]);
	const [inputValue, setInputValue] = useState("");
	const [isThinking, setIsThinking] = useState(false);
	const messagesEndRef = useRef(null);
	const dialogRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages, isThinking]);

	const handleSendMessage = (e) => {
		e.preventDefault();

		if (!inputValue.trim()) return;

		// Add user message
		const userMessage = {
			id: messages.length + 1,
			type: "user",
			text: inputValue,
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputValue("");
		setIsThinking(true);

		// Simulate bot response
		setTimeout(() => {
			setIsThinking(false);
			const botMessage = {
				id: messages.length + 2,
				type: "bot",
				text: "Thanks for your message! This is a demo response. In a real application, this would be connected to an AI service.",
			};
			setMessages((prev) => [...prev, botMessage]);
		}, 1500);
	};

	if (!isOpen) return null;

	const dialogStyle =
		buttonPosition && window.innerWidth >= 768
			? {
					position: "fixed",
					bottom: `calc(100vh - ${buttonPosition.top}px + 16px)`,
					right: "32px",
					zIndex: 50,
			  }
			: {};

	return (
		<div
			className="fixed inset-0 z-40 flex items-center justify-center bg-black/50"
			onClick={onClose}
		>
			<div
				ref={dialogRef}
				style={dialogStyle}
				className="bg-card border border-border rounded-xl shadow-xl w-full max-w-sm mx-4 h-[500px] flex flex-col animate-in fade-in zoom-in-95 duration-300 md:mx-0"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="flex items-center gap-3 px-6 py-4 border-b border-border">
					<div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden">
						<Image
							src="/lawrence-profile.jpg"
							alt="Lawrence Cunanan"
							width={40}
							height={40}
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2">
							<h3 className="font-semibold text-foreground truncate">
								Lawrence Cunanan
							</h3>
							<svg
								viewBox="0 0 22 22"
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 flex-shrink-0"
								aria-label="Verified user"
							>
								<path
									d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
									fill="#1d9bf0"
								></path>
							</svg>
						</div>
						<div className="flex items-center gap-1.5">
							<div className="w-2 h-2 rounded-full bg-green-500"></div>
							<p className="text-xs text-green-600 dark:text-green-400">
								Active
							</p>
						</div>
					</div>
					<button
						onClick={onClose}
						className="p-1 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
						aria-label="Close chat"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Messages */}
				<div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
					{messages.map((message) => (
						<div
							key={message.id}
							className={`flex gap-3 ${
								message.type === "user" ? "justify-end" : "justify-start"
							}`}
						>
							{message.type === "bot" && (
								<div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
									<Image
										src="/lawrence-profile.jpg"
										alt="Lawrence"
										width={32}
										height={32}
										className="w-full h-full object-cover"
									/>
								</div>
							)}
							<div
								className={`max-w-xs px-4 py-2 rounded-lg ${
									message.type === "user"
										? "bg-primary text-primary-foreground rounded-br-none"
										: "bg-muted text-foreground rounded-bl-none"
								}`}
							>
								<p className="text-sm">{message.text}</p>
							</div>
						</div>
					))}
					{isThinking && (
						<div className="flex gap-3 justify-start">
							<div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
								<Image
									src="/lawrence-profile.jpg"
									alt="Lawrence"
									width={32}
									height={32}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className=" flex gap-1 items-center bg-muted text-foreground rounded-lg rounded-bl-none px-4 py-2">
								<span
									className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
									style={{ animationDelay: "0ms" }}
								></span>
								<span
									className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
									style={{ animationDelay: "150ms" }}
								></span>
								<span
									className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
									style={{ animationDelay: "300ms" }}
								></span>
							</div>
						</div>
					)}
					<div ref={messagesEndRef} />
				</div>

				<div className="px-6 py-2 text-xs text-muted-foreground text-left">
					You can ask about projects, experience, technologies, or anything
					else!
				</div>

				<form
					onSubmit={handleSendMessage}
					className="border-t border-border px-6 py-4 flex gap-2"
				>
					<input
						type="text"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						placeholder="Type a message..."
						className="flex-1 px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-sm text-foreground placeholder-muted-foreground"
						disabled={isThinking}
					/>
					<button
						type="submit"
						className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex-shrink-0"
						aria-label="Send message"
						disabled={isThinking}
					>
						<Send className="w-4 h-4" />
					</button>
				</form>
			</div>
		</div>
	);
}
