"use client";

import { createDemand } from "@/app/lib/actions";
import Link from "next/link";

export default function Form() {
	return (
		<form action={createDemand}>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">
				<div className="mb-4">
					<label htmlFor="products" className="mb-2 block text-sm font-medium">
						Customer ID
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="customer_id"
								name="customer_id"
								type="text"
								placeholder="Enter the Customer ID"
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							/>
						</div>
					</div>
				</div>

				<div className="mb-4">
					<label htmlFor="products" className="mb-2 block text-sm font-medium">
						Description
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="description"
								name="description"
								type="text"
								placeholder="Enter the description"
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							/>
						</div>
					</div>
				</div>

				<div className="mb-4">
					<label htmlFor="products" className="mb-2 block text-sm font-medium">
						Keywords
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="keywords"
								name="keywords"
								type="text"
								placeholder="Enter the keywords"
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							/>
						</div>
					</div>
				</div>
				<div className="flex mt-6 justify-end gap-4">
					<Link
						href="/dashboard/demands"
						className="bg-gray-100 p-2 rounded-md text-black transition-colors hover:bg-gray-200"
					>
						Cancel
					</Link>
					<button
						type="submit"
						className="bg-green-500 p-2 rounded-md text-white transition-colors hover:bg-green-600"
					>
						Create Demand
					</button>
				</div>
			</div>
		</form>
	);
}
