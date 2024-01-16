export default async function CardWrapper() {
	return (
		<>
			<Card title="Title 1" value={12} type="type1" />
			<Card title="Title 2" value={4} type="type2" />
			<Card title="Title 3" value={7} type="type3" />
			<Card title="Title 4" value={15} type="type4" />
		</>
	);
}

export function Card({
	title,
	value,
	type,
}: {
	title: string;
	value: number | string;
	type: string;
}) {
	return (
		<div className="rounded-xl bg-gray-50 p-2 shadow-sm">
			<div className="p-4">
				<h3 className="ml-2 text-sm font-medium">{title}</h3>
			</div>
			<p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
				{value}
			</p>
		</div>
	);
}
