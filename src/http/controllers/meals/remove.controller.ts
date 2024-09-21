import { z } from 'zod';

import { makeRemoveMealUseCase } from '@/services/factories/make-remove-meal-use-case';

import type { FastifyReply, FastifyRequest } from "fastify";

export async function remove(request: FastifyRequest, reply: FastifyReply) {
	const removeMealParamsSchema = z.object({
		mealId: z.string().uuid(),
	});

	const { mealId } = removeMealParamsSchema.parse(request.params);

	const removeMeal = makeRemoveMealUseCase();

	await removeMeal.execute({
		id: mealId,
		userId: request.user.sub,
	});

	return reply.status(204).send();
}
