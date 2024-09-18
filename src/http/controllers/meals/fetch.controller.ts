import { makeFetchMealsUseCase } from '@/services/factories/make-fetch-meals-use-case';

import type { FastifyReply, FastifyRequest } from "fastify";

export async function fetch(request: FastifyRequest, reply: FastifyReply) {    
    const fetchMeals = makeFetchMealsUseCase();

	const { meals } = await fetchMeals.execute({
		userId: request.user.sub,
	});

	return reply.status(200).send({
		meals,
	});
}
