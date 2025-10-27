export default function BuiltWithSection() {
	return (
		<section className="pt-6 border-t border-border">
			<div className="space-y-2">
				<p className="text-sm text-muted-foreground">
					Built with{" "}
					<span className="font-semibold text-foreground">Next.js</span> and{" "}
					<span className="font-semibold text-foreground">Tailwind CSS</span>,
					deployed with{" "}
					<span className="font-semibold text-foreground">Vercel</span>
				</p>
				<p className="text-xs text-muted-foreground">
					© 2025 Lawrence Cunanan. All rights reserved.
				</p>
			</div>
		</section>
	);
}
