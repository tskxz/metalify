import bcrypt from "bcryptjs"
import {db} from "../../db"
import {users} from "../../db/schema"

export default defineEventHandler(async (event) => {
	const {username, email, password} = await useBody(event);

	const existingUser = await db.select().from(users).where(users.email.eq(email)).limit(1).execute();
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