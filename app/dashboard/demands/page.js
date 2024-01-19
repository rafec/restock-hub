import { fetchLatestDemands } from "@/app/lib/data";

export default async function Page() {
	const latestDemands = await fetchLatestDemands();

	return (
		<main>
			<h1 className="font-bold text-2xl pb-2">Demands</h1>
			<div>
				{latestDemands.map((demand) => {
					return (
						<div
							className="bg-slate-100 rounded-lg p-1.5 hover:bg-slate-200 my-2"
							key={demand.id}
						>
							<h2 className="font-bold">Client name</h2>
							<p>{demand.description}</p>
						</div>
					);
				})}
			</div>
		</main>
	);
}
