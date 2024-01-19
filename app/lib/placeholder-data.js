const users = [
	{
		id: "0fb5eb4f-966f-4a3c-a3e8-058269f10c44",
		name: "Rafael Brizuena",
		email: "rafael@mail.com",
		country: "Brazil",
		state: "Mato Grosso",
		city: "Cuiaba",
		address: "15 street, 190",
		password: "123456",
	},
	{
		id: "13d45148-8404-4651-a381-34f7fdffa8cc",
		name: "Marcelo Ferreira",
		email: "marcelo@mail.com",
		country: "Brazil",
		state: "Rio Grande do Norte",
		city: "Natal",
		address: "Lemon street, 901",
		password: "123456",
	},
];

const roles = [
	{
		id: "24a504a0-8ee2-44f4-ae42-2b6090b73af7",
		role_name: "Buyer",
	},
	{
		id: "d4e3d93a-b827-427d-b03a-629cb786f568",
		role_name: "Supplier",
	},
];

const users_roles = [
	{
		user_id: users[0].id,
		role_id: roles[0].id,
	},
];

const products = [
	{
		id: "850353dc-68dc-42fa-8faa-607b7f3c63d5",
		name: "Internet Cable",
		description: "5m CAT5E Internet Cable",
		price: 5,
	},
	{
		id: "8e86ceac-05e0-4181-9a55-77915ede5b2e",
		name: "iPhone 19",
		description: "iPhone 19 is super cool!",
		price: 5000,
	},
];

const stock = [
	{
		supplier_id: users[0].id,
		product_id: products[0].id,
		quantity: 100,
	},
];

const demands = [
	{
		id: "71fa0908-19f6-4d0a-b46a-597fa8accaa1",
		customer_id: "0fb5eb4f-966f-4a3c-a3e8-058269f10c44",
		description: "I need 100 5m CAT5E internet cables",
		keywords: "internet cable cat5e 5m",
		date: "2024-01-14 19:42:57",
		status: "open",
	},
	{
		id: "91f2898c-2d11-4e79-b412-d3b2f1bf35ff",
		customer_id: "13d45148-8404-4651-a381-34f7fdffa8cc",
		description:
			"I love internet cables, so I want to buy everithing you may have. I like the 5m CAT5E internet cables.",
		keywords: "internet cable cat5e 5m",
		date: "2024-01-14 19:42:57",
		status: "open",
	},
];

const transactions = [
	{
		id: "ee2b9e0b-fe40-430f-a9f0-15d44cc76744",
		buyer_id: "0fb5eb4f-966f-4a3c-a3e8-058269f10c44",
		supplier_id: "0fb5eb4f-966f-4a3c-a3e8-058269f10c44",
		product_id: "850353dc-68dc-42fa-8faa-607b7f3c63d5",
		quantity: 5,
		total_value: 25,
		transaction_date: "2024-01-14 15:30:00",
	},
];

module.exports = {
	users,
	roles,
	users_roles,
	products,
	stock,
	demands,
	transactions,
};
