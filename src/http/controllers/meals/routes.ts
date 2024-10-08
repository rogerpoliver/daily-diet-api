import type { FastifyInstance } from "fastify";

import { verifyJwt } from '@/http/middlewares/verify-jwt';

// import { verifyUserRole } from '@/http/middlewares/verify-user-role';
import { create } from './create.controller';
import { fetch } from './fetch.controller';
import { get } from './get.controller';
import { metrics } from './metrics.controller';
import { remove } from './remove.controller';
import { update } from './update.controller';

export async function mealsRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJwt);

	app.post("/meals", create);

	app.get("/meals", fetch);
	app.get("/meals/metrics", metrics);
	app.get("/meals/:mealId", get);
	app.put("/meals/:mealId", update);
	app.delete("/meals/:mealId", remove);
}
