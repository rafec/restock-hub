import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchLatestDemands() {
	noStore();
	try {
		const data =
			await sql`SELECT demands.id, demands.description, users.name FROM demands INNER JOIN users ON demands.client_id=users.id;`;

		const demands = data.rows;
		return demands;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch the latest demands.");
	}
}
