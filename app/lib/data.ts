import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchLatestDemands() {
	noStore();
	try {
		const data =
			await sql`SELECT demands.id, demands.description, demands.date, users.name FROM demands INNER JOIN users ON demands.customer_id=users.id;`;

		data.rows.map((demand) => {
			const day = demand.date.getDate();
			let month = demand.date.getMonth() + 1;
			if (month < 10) {
				month = "0" + month;
			}

			demand.date = `${day}/${month}`;
		});

		const demands = data.rows;

		return demands;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch the latest demands.");
	}
}
