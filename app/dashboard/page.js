import CardWrapper from "@/app/ui/dashboard/cards";

export default function Page() {
	return (
		<main>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<CardWrapper />
			</div>
		</main>
	);
}
