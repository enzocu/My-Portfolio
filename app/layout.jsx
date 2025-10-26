import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { AlertProvider } from "@/contexts/alert-context";
import AlertContainer from "@/components/alert-container";
import { UserContextAuthProvider } from "@/contexts/user-context";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata = {
	title: "Lawrence S. Cunanan",
	description: "Portfolio of Lawrence S. Cunanan",
	generator: "LACUNANAN",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" />
				<link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
			</head>
			<body className={`font-sans antialiased`}>
				<AlertProvider>
					<UserContextAuthProvider>
						{children}
						<AlertContainer />
					</UserContextAuthProvider>
				</AlertProvider>
				<Analytics />
			</body>
		</html>
	);
}
