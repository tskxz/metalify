import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {db} from "../../db"
import {users} from "../../db/schema"
import { eq } from "drizzle-orm";

const JWT_SECRET = "teste"

export default defineEventHandler(async (event) => {
	const {email, password } = await readBody(event);

	const user = await db.select().from(users).where(eq(users.email, email)).limit(1).execute();

	if(!user || !user[0]){
		throw createError({statusCode: 400, statusMessage: "Utilizador nao encontrado :("})
	}

	const isPasswordValid = await bcrypt.compare(password, user[0].password);

	if(!isPasswordValid){
		throw createError({statusCode: 400, statusMessage: "Password errada..."})
	}

	const token = jwt.sign(
		{
			userID: user[0].id,
			username: user[0].username
		},
		JWT_SECRET,
		{expiresIn: "1h"}
	)

	return {token, userID: user[0].id, username: user[0].username };
})