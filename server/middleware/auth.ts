import jwt from "jsonwebtoken"
const JWT_SECRET = "teste"

export default defineEventHandler(async (event) => {
	const token = event.node.req.headers["authorization"]?.replace("Bearer ", "");

	if(!token){
		throw createError({statusCode: 403, statusMessage: "Token nao fornecido"})
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET)
		event.context.user = decoded // guardar dados do user
	} catch (error) {
		throw createError({statusCode: 403, statusMessage: "Token invalido"})
	}
})