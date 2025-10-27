"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Download, LogOut, Menu, X } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import ProjectDialog from "./dialogs/project-dialog";
import AchievementsDialog from "./dialogs/achievements-dialog";
import TechnologyDialog from "./dialogs/technology-dialog";
import GalleryDialog from "./dialogs/gallery-dialog";
import SignInDialog from "./dialogs/signin-dialog";
import SignOutConfirmationDialog from "./dialogs/signout-confirmation-dialog";
import { useAlert } from "@/contexts/alert-context";

import { useUserAuth } from "@/contexts/user-context";

export default function Header({ isDark, onToggleDarkMode }) {
	const { userDetails, userRef } = useUserAuth();
	const searchParams = useSearchParams();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const [dialogs, setDialogs] = useState({
		project: false,
		achievements: false,
		technology: false,
		gallery: false,
		signIn: false,
		signOutConfirm: false,
	});

	const { showAlert } = useAlert();

	const openDialog = (name) =>
		setDialogs((prev) => ({ ...prev, [name]: true }));
	const closeDialog = (name) =>
		setDialogs((prev) => ({ ...prev, [name]: false }));

	useEffect(() => {
		const mode = searchParams.get("mode");
		if (mode === "signin" && !userDetails?.isCurrentUser) {
			openDialog("signIn");
		}
	}, [searchParams, userDetails]);

	const handleDownloadCV = () => {
		const link = document.createElement("a");
		link.href = "/cv.pdf";
		link.download = "Lawrence-CV.pdf";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const menuItems = [
		{ name: "Project", dialog: "project" },
		{ name: "Achievement", dialog: "achievements" },
		{ name: "Technology", dialog: "technology" },
		{ name: "Gallery", dialog: "gallery" },
	];

	const renderRegisterButtons = (isMobile = false) =>
		menuItems.map((item, index) => (
			<button
				key={item.name}
				onClick={() => {
					openDialog(item.dialog.toLowerCase());
					if (isMobile) setIsMobileMenuOpen(false);
				}}
				className={`w-full text-left px-3 py-2 hover:bg-background transition-colors text-xs rounded ${
					!isMobile && index > 0 ? "border-t border-border" : ""
				}`}
			>
				{isMobile ? item.name : `Register ${item.name}`}
			</button>
		));

	return (
		<>
			<header className="fixed top-0 left-0 right-0 z-50 bg-background/5 backdrop-blur-sm border-b border-border">
				<div className="flex items-center justify-between px-6 py-4">
					<div className="flex items-center gap-3">
						<img
							src={isDark ? "/logo-dark-mode.png" : "/logo-light-mode.png"}
							alt="Lawrence Logo"
							className="w-8 h-8 transition-opacity duration-300"
						/>
					</div>

					<div className="hidden md:flex items-center gap-4">
						<button
							onClick={handleDownloadCV}
							className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm"
							aria-label="Download CV"
						>
							<Download className="w-4 h-4" />
							Download CV
						</button>

						<ThemeToggle isDark={isDark} onToggleDarkMode={onToggleDarkMode} />
						{userDetails?.isCurrentUser && (
							<>
								<div className="relative">
									<button
										onClick={() => setIsDropdownOpen(!isDropdownOpen)}
										className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm"
									>
										Register
									</button>
									{isDropdownOpen && (
										<div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg">
											{renderRegisterButtons(false)}
										</div>
									)}
								</div>

								<button
									onClick={() => openDialog("signOutConfirm")}
									className="flex items-center gap-3 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm text-foreground"
								>
									<LogOut className="w-4 h-4" />
									Sign Out
								</button>
							</>
						)}
					</div>

					<div className="md:hidden flex items-center gap-2">
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="p-2 hover:bg-muted rounded-lg transition-colors"
							aria-label="Toggle mobile menu"
						>
							{isMobileMenuOpen ? (
								<X className="w-5 h-5" />
							) : (
								<Menu className="w-5 h-5" />
							)}
						</button>
					</div>
				</div>

				{isMobileMenuOpen && (
					<div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
						<div className="px-6 py-4 space-y-4">
							<button
								onClick={handleDownloadCV}
								className="w-full flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm"
							>
								<Download className="w-4 h-4" />
								Download CV
							</button>

							<div className="px-4 py-3 bg-muted rounded-lg border border-border">
								<p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
									Theme
								</p>
								<ThemeToggle
									isDark={isDark}
									onToggleDarkMode={onToggleDarkMode}
								/>
							</div>

							{userDetails?.isCurrentUser && (
								<>
									<div className="space-y-2">
										<p className="text-xs font-semibold text-muted-foreground px-2 uppercase tracking-wide">
											Register
										</p>
										<div className="space-y-1 bg-muted rounded-lg p-2 border border-border">
											{renderRegisterButtons(true)}
										</div>
									</div>

									<button
										onClick={() => openDialog("signOutConfirm")}
										className="w-full flex items-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors text-sm text-foreground"
									>
										<LogOut className="w-4 h-4" />
										Sign Out
									</button>
								</>
							)}
						</div>
					</div>
				)}
			</header>

			<ProjectDialog
				isOpen={dialogs.project}
				onClose={() => closeDialog("project")}
				projectData={null}
				userDetails={userDetails}
				userRef={userRef}
				showAlert={showAlert}
			/>
			<AchievementsDialog
				isOpen={dialogs.achievements}
				onClose={() => closeDialog("achievements")}
				achievementData={null}
				userRef={userRef}
				showAlert={showAlert}
			/>
			<TechnologyDialog
				isOpen={dialogs.technology}
				onClose={() => closeDialog("technology")}
				registeredTechnologies={userDetails?.us_technology}
				usRef={userRef}
				showAlert={showAlert}
			/>
			<GalleryDialog
				isOpen={dialogs.gallery}
				onClose={() => closeDialog("gallery")}
				registeredImages={userDetails?.us_gallery}
				deleteImage={null}
				usRef={userRef}
				showAlert={showAlert}
			/>
			<SignInDialog
				isOpen={dialogs.signIn}
				onClose={() => closeDialog("signIn")}
			/>
			<SignOutConfirmationDialog
				isOpen={dialogs.signOutConfirm}
				onClose={() => closeDialog("signOutConfirm")}
			/>
		</>
	);
}
