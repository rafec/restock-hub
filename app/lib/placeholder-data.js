const users = [
	{
		id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
		name: "Rafael Brizuena",
		email: "rafael@mail.com",
		country: "Brazil",
		state: "Mato Grosso",
		city: "Cuiaba",
		address: "15 street, 190",
		password: "123456",
	},
];

const roles = [
	{
		id: "3958dc9e-712f-4377-85e9-fec4b6a6442b",
		role_name: "Buyer",
	},
	{
		id: "3958dc9e-712f-4377-85e9-fec4b6a6442c",
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
		id: "3958dc9e-712f-4377-85e9-fec4b6a6442d",
		name: "Internet Cable",
		description: "5m CAT5E Internet Cable",
		price: 5,
	},
];

const stock = [
	{
		supplier_id: users[0].id,
		product_id: products[0].id,
		quantity: 100,
	},
];

const transactions = [
	{
		id: "3958dc9e-712f-4377-85e9-fec4b6a6442e",
		buyer_id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
		supplier_id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
		product_id: "3958dc9e-712f-4377-85e9-fec4b6a6442d",
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
	transactions,
};
