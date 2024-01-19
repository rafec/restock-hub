"use server";

export async function createDemand(formData: FormData) {
	const rawFormData = {
		customer_id: formData.get("customer_id"),
		description: formData.get("description"),
		keywords: formData.get("keywords"),
		date: new Date(),
		status: "open",
	};
	console.log(rawFormData);
}
