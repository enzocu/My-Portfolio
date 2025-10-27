"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import Image from "next/image";
import callGemini from "@/controller/api/geminiAPI";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getSaveTag } from "../../controller/get/getSavetag";
import { useAlert } from "@/contexts/alert-context";
import { useUserAuth } from "@/contexts/user-context";

export default function ChatDialog({ isOpen, onClose, buttonPosition }) {
	const { userRef, userDetails } = useUserAuth();
	const { showAlert } = useAlert();
	const [messages, setMessages] = useState([
		{
			role: "model",
			parts: [
				{
					text: "Hi! I'm Lawrence 👋. Feel free to ask me about my projects, experience, or anything you'd like to know!",
				},
			],
		},
	]);
	const [inputValue, setInputValue] = useState("");
	const [isThinking, setIsThinking] = useState(false);
	const [saveTagData, setSaveTagData] = useState("");
	const messagesEndRef = useRef(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, isThinking, isOpen]);

	useEffect(() => {
		if (userRef) {
			getSaveTag(userRef, setSaveTagData, showAlert);
		}
	}, [userRef]);

	const handleSendMessage = async (e) => {
		e.preventDefault();
		if (!inputValue.trim() || isThinking) return;

		const userMessage = {
			role: "user",
			parts: [{ text: inputValue }],
		};

		const newMessages = [...messages, userMessage];
		setMessages(newMessages);
		setInputValue("");

		await callGemini(
			newMessages,
			setMessages,
			saveTagData || "No additional data.",
			setIsThinking
		);
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
				style={dialogStyle}
				className="bg-card border border-border rounded-xl shadow-xl w-full max-w-md mx-6 h-[600px] flex flex-col animate-in fade-in zoom-in-95 duration-300 md:mx-0"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="flex items-center gap-3 px-6 py-4 border-b border-border">
					<div className="w-10 h-10 rounded-full overflow-hidden">
						<Image
							src="/lawrence-profile.jpg"
							alt="Lawrence Cunanan"
							width={40}
							height={40}
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="flex-1">
						<h3 className="font-semibold text-foreground flex items-center gap-1">
							Lawrence Cunanan
							<svg
								viewBox="0 0 22 22"
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4"
							>
								<path
									d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
									fill="#1d9bf0"
								></path>
							</svg>
						</h3>
						<p className="text-xs text-green-500 flex items-center gap-1">
							<span className="w-2 h-2 rounded-full bg-green-500"></span> Active
						</p>
					</div>
					<button
						onClick={onClose}
						className="p-1 hover:bg-muted rounded-lg transition-colors"
					>
						<X className="w-5 h-5" />
					</button>
				</div>
				{/* Messages */}
				<div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
					{messages.map((message, i) => {
						if (message.role === "user") {
							return (
								<div key={i} className="flex justify-end">
									<div className="max-w-xs bg-primary text-primary-foreground px-4 py-2 rounded-lg rounded-br-none">
										<p className="text-sm whitespace-pre-line">
											{message.parts[0].text}
										</p>
									</div>
								</div>
							);
						}

						return (
							<div key={i} className="flex gap-3 justify-start">
								<div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
									<Image
										src="/lawrence-profile.jpg"
										alt="Lawrence"
										width={32}
										height={32}
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="max-w-xs bg-muted text-foreground px-4 py-2 rounded-lg rounded-bl-none text-sm">
									<ReactMarkdown
										remarkPlugins={[remarkGfm]}
										components={{
											p: ({ node, ...props }) => (
												<p className="mb-2 text-[13px]" {...props} />
											),
											ul: ({ node, ...props }) => (
												<ul
													className="list-disc list-inside ml-4 mb-2 text-[13px]"
													{...props}
												/>
											),
											ol: ({ node, ...props }) => (
												<ol
													className="list-decimal list-inside ml-4 mb-2 text-[13px]"
													{...props}
												/>
											),
											table: ({ node, ...props }) => (
												<div className="overflow-x-auto my-4  text-[13px]">
													<table
														className="border border-gray-300 text-sm text-left w-full "
														{...props}
													/>
												</div>
											),
											th: ({ node, ...props }) => (
												<th
													className=" border-gray-300  px-2 py-1 text-[13px] min-w-[120px]"
													{...props}
												/>
											),
											td: ({ node, ...props }) => (
												<td
													className="border border-gray-300 px-2 py-1 text-[13px]"
													{...props}
												/>
											),
											img: ({ node, ...props }) => (
												<img
													className="max-w-full h-auto my-2 rounded"
													style={{ maxHeight: "200px" }}
													{...props}
												/>
											),
											a: ({ node, ...props }) => (
												<a className="text-blue-600 underline" {...props} />
											),
											hr: ({ node, ...props }) => (
												<hr className="my-4 border-gray-300" {...props} />
											),
										}}
									>
										{message.parts[0].text}
									</ReactMarkdown>
								</div>
							</div>
						);
					})}

					{isThinking && (
						<div className="flex gap-3 justify-start">
							<div className="w-8 h-8 rounded-full overflow-hidden">
								<Image
									src="/lawrence-profile.jpg"
									alt="Lawrence"
									width={32}
									height={32}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="flex gap-1 items-center bg-muted text-foreground rounded-lg px-4 py-2">
								<span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
								<span
									className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
									style={{ animationDelay: "150ms" }}
								/>
								<span
									className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
									style={{ animationDelay: "300ms" }}
								/>
							</div>
						</div>
					)}

					<div ref={messagesEndRef} />
				</div>
				{/* Input */}
				<form
					onSubmit={handleSendMessage}
					className="border-t border-border px-6 pt-2 flex gap-2"
				>
					<input
						type="text"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						placeholder="Type a message..."
						className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm"
						disabled={isThinking}
					/>
					<button
						type="submit"
						className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
						disabled={isThinking}
					>
						<Send className="w-4 h-4" />
					</button>
				</form>
				<div className="px-6 py-4 text-xs text-muted-foreground text-left">
					{" "}
					You can ask about projects, experience, technologies, or anything
					else!{" "}
				</div>
			</div>
		</div>
	);
}
