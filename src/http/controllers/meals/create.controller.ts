import { z } from 'zod';

import { makeCreateMealUseCase } from '@/services/factories/make-create-meal-use-case';

import type { FastifyReply, FastifyRequest } from "fastify";

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createMealBodySchema = z.object({
		name: z.string(),
		description: z.string(),
		dateAndTime: z.string(),
		isOnDiet: z.boolean().default(false),
	});

	const { name, description, dateAndTime, isOnDiet } =
		createMealBodySchema.parse(request.body);

	const createMeal = makeCreateMealUseCase();

	const meal = await createMeal.execute({
		name,
		userId: request.user.sub,
		description,
		dateAndTime: new Date(dateAndTime),
		isOnDiet,
	});

	return reply.status(201).send({ meal });
}
