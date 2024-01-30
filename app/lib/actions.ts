"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
	id: z.string(),
	customer_id: z.string(),
	description: z.string(),
	keywords: z.string(),
	date: z.date(),
	status: z.string(),
});

const CreateDemand = FormSchema.omit({ id: true, date: true, status: true });

export async function createDemand(formData: FormData) {
	const { customer_id, description, keywords } = CreateDemand.parse({
		customer_id: formData.get("customer_id"),
		description: formData.get("description"),
		keywords: formData.get("keywords"),
	});
	const date = new Date().toISOString();
	const status = "open";

	await sql`
    INSERT INTO demands (customer_id, description, keywords, date, status)
    VALUES (${customer_id}, ${description}, ${keywords}, ${date}, ${status});
    `;

	revalidatePath("/dashboard/demands");
	redirect("/dashboard/demands");
}
