const { db } = require("@vercel/postgres");
const {
	users,
	roles,
	users_roles,
	products,
	stock,
	demands,
	transactions,
} = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
		// Create the "users" table if it doesn't exist
		const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        country VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        password TEXT NOT NULL
      );
    `;

		console.log(`Created "users" table`);

		// Insert data into the "users" table
		const insertedUsers = await Promise.all(
			users.map(async (user) => {
				const hashedPassword = await bcrypt.hash(user.password, 10);
				return client.sql`
        INSERT INTO users (id, name, email, country, state, city, address, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${user.country}, ${user.state}, ${user.city}, ${user.address}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
			})
		);

		console.log(`Seeded ${insertedUsers.length} users`);

		return {
			createTable,
			users: insertedUsers,
		};
	} catch (error) {
		console.error("Error seeding users:", error);
		throw error;
	}
}

async function seedRoles(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

		// Create the "roles" table if it doesn't exist
		const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS roles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
  );
`;

		console.log(`Created "roles" table`);

		// Insert data into the "roles" table
		const insertedRoles = await Promise.all(
			roles.map(
				(role) => client.sql`
        INSERT INTO roles (id, role_name)
        VALUES (${role.id}, ${role.role_name})
        ON CONFLICT (id) DO NOTHING;
      `
			)
		);

		console.log(`Seeded ${insertedRoles.length} roles`);

		return {
			createTable,
			roles: insertedRoles,
		};
	} catch (error) {
		console.error("Error seeding roles:", error);
		throw error;
	}
}

async function seedUsersRoles(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

		// Create the "users_roles" table if it doesn't exist
		const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users_roles (
        user_id UUID REFERENCES users(id),
        role_id UUID REFERENCES roles(id),
        PRIMARY KEY (user_id, role_id)
      );
    `;

		console.log(`Created "users_roles" table`);

		// Insert data into the "users_roles" table
		const insertedUsersRoles = await Promise.all(
			users_roles.map(
				(user_role) => client.sql`
        INSERT INTO users_roles (user_id, role_id)
        VALUES (${user_role.user_id}, ${user_role.role_id})
        ON CONFLICT (user_id, role_id) DO NOTHING;
      `
			)
		);

		console.log(`Seeded ${insertedUsersRoles.length} users_roles`);

		return {
			createTable,
			users_roles: insertedUsersRoles,
		};
	} catch (error) {
		console.error("Error seeding users_roles:", error);
		throw error;
	}
}

async function seedProducts(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
		// Create the "products" table if it doesn't exist
		const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL
      );
    `;

		console.log(`Created "products" table`);

		// Insert data into the "products" table
		const insertedProducts = await Promise.all(
			products.map(
				(product) => client.sql`
        INSERT INTO products (id, name, description, price)
        VALUES (${product.id}, ${product.name}, ${product.description}, ${product.price})
        ON CONFLICT (id) DO NOTHING;
      `
			)
		);

		console.log(`Seeded ${insertedProducts.length} products`);

		return {
			createTable,
			products: insertedProducts,
		};
	} catch (error) {
		console.error("Error seeding products:", error);
		throw error;
	}
}

async function seedStock(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

		// Create the "stock" table if it doesn't exist
		const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS stock (
        supplier_id UUID REFERENCES users(id),
        product_id UUID REFERENCES products(id),
        quantity INTEGER NOT NULL,
        PRIMARY KEY (supplier_id, product_id)
      );
    `;

		console.log(`Created "stock" table`);

		// Insert data into the "stock" table
		const insertedStock = await Promise.all(
			stock.map(
				(stk) => client.sql`
        INSERT INTO stock (supplier_id, product_id, quantity)
        VALUES (${stk.supplier_id}, ${stk.product_id}, ${stk.quantity})
        ON CONFLICT (supplier_id, product_id) DO NOTHING;
      `
			)
		);

		console.log(`Seeded ${insertedStock.length} stock`);

		return {
			createTable,
			stock: insertedStock,
		};
	} catch (error) {
		console.error("Error seeding stock:", error);
		throw error;
	}
}

async function seedDemands(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
		// Create the "demands" table if it doesn't exist
		const createTable = await client.sql`
		CREATE TABLE IF NOT EXISTS demands (
			id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
			user_id UUID REFERENCES users(id),
			description TEXT NOT NULL,
			keywords VARCHAR(255),
			date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			status VARCHAR(50) NOT NULL
		);`;

		console.log(`Created "demands" table`);

		// Insert data into the "transactions" table
		const insertedDemands = await Promise.all(
			demands.map(
				(demand) =>
					client.sql`INSERT INTO demands (id, user_id, description, keywords, date, status) VALUES (${demand.id}, ${demand.user_id}, ${demand.description}, ${demand.keywords}, ${demand.date}, ${demand.status})
					ON CONFLICT (id) DO NOTHING;`
			)
		);

		console.log(`Seeded ${insertedDemands.length} demands`);

		return {
			createTable,
			demands: insertedDemands,
		};
	} catch (error) {
		console.error("Error seeding demands:", error);
		throw error;
	}
}

async function seedTransactions(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
		// Create the "transactions" table if it doesn't exist
		const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS transactions (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        buyer_id UUID REFERENCES users(id),
        supplier_id UUID REFERENCES users(id),
        product_id UUID REFERENCES products(id),
        quantity INTEGER NOT NULL,
        total_value DECIMAL(10, 2) NOT NULL,
        transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

		console.log(`Created "transactions" table`);

		// Insert data into the "transactions" table
		const insertedTransactions = await Promise.all(
			transactions.map(
				(transaction) => client.sql`
        INSERT INTO transactions (id, buyer_id, supplier_id, product_id, quantity, total_value, transaction_date)
        VALUES (${transaction.id}, ${transaction.buyer_id}, ${transaction.supplier_id}, ${transaction.product_id}, ${transaction.quantity}, ${transaction.total_value}, ${transaction.transaction_date})
        ON CONFLICT (id) DO NOTHING;
      `
			)
		);

		console.log(`Seeded ${insertedTransactions.length} transactions`);

		return {
			createTable,
			transactions: insertedTransactions,
		};
	} catch (error) {
		console.error("Error seeding transactions:", error);
		throw error;
	}
}

async function main() {
	const client = await db.connect();

	await seedUsers(client);
	await seedRoles(client);
	await seedUsersRoles(client);
	await seedProducts(client);
	await seedStock(client);
	await seedDemands(client);
	await seedTransactions(client);

	await client.end();
}

main().catch((err) => {
	console.error(
		"An error occurred while attempting to seed the database:",
		err
	);
});
