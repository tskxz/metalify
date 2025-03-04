import bcrypt from "bcryptjs"
import {db} from "../../db"
import {users} from "../../db/schema"
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
	const {username, email, password} = await readBody(event);

	const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1).execute();
	if(existingUser.length > 0){
		throw createError({statusCode: 400, statusMessage: "Utilizador ja existe"})
	}

	const hashedPassword = await bcrypt.hash(password, 10)
	await db.insert(users).values({
		username,
		email,
		password: hashedPassword,
	})

	return {message: "Utilizador criado :D"}
})