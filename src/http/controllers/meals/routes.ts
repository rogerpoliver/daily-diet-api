import type { FastifyInstance } from "fastify";

import { verifyJwt } from '@/http/middlewares/verify-jwt';

// import { verifyUserRole } from '@/http/middlewares/verify-user-role';
import { create } from './create.controller';

export async function mealsRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJwt);
	app.post("/meals", create);
}
