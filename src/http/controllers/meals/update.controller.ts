import { z } from 'zod';

import { makeUpdateMealUseCase } from '@/services/factories/make-update-meal-use-case';

import type { FastifyReply, FastifyRequest } from "fastify";

export async function update(request: FastifyRequest, reply: FastifyReply) {
	const updateMealBodySchema = z.object({
		name: z.string(),
		description: z.string(),
		dateAndTime: z.string(),
		isOnDiet: z.boolean().default(false),
	});

	const updateMealParamsSchema = z.object({
		mealId: z.string().uuid(),
	});

	const { mealId } = updateMealParamsSchema.parse(request.params);
	const { name, description, dateAndTime, isOnDiet } =
		updateMealBodySchema.parse(request.body);

	const updateMeal = makeUpdateMealUseCase();

	const meal = await updateMeal.execute({
		mealId,
		userId: request.user.sub,
		name,
		description,
		date_and_time: new Date(dateAndTime),
		is_on_diet: isOnDiet,
	});

	return reply.status(200).send(meal);
}
