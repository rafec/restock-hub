import { sql } from "@vercel/postgres";

export async function fetchLatestDemands() {
	// noStore();
	try {
		const data = await sql`SELECT id, description FROM demands;`;
		console.log(data.rows);
		const demands = data.rows;
		return demands;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch the latest demands.");
	}
}
