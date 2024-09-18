import { z } from "zod";

import { makeGetMealUseCase } from "@/services/factories/make-get-meal-use-case";

import type { FastifyReply, FastifyRequest } from "fastify";

export async function get(request: FastifyRequest, reply: FastifyReply) {
	const getMealParamsSchema = z.object({
		mealId: z.string().uuid(),
	});
	const { mealId } = getMealParamsSchema.parse(request.params);
	const getMeal = makeGetMealUseCase();
	const { meal } = await getMeal.execute({
		mealId,
		userId: request.user.sub,
	});

	return reply.status(200).send({
		meal,
	});
}
