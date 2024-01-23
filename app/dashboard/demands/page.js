import { fetchLatestDemands } from "@/app/lib/data";

export default async function Page() {
	const latestDemands = await fetchLatestDemands();

	return (
		<div className="w-full">
			<h1 className="font-bold text-2xl pb-2">Demands</h1>
			<div>
				{latestDemands.map((demand) => {
					return (
						<div
							className="bg-gray-50 rounded-lg p-1.5 hover:bg-gray-100 my-2"
							key={demand.id}
						>
							<div className="flex justify-between">
								<h2 className="font-bold">{demand.name}</h2>
								<p className="text-slate-500">{demand.date}</p>
							</div>
							<p>{demand.description}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
