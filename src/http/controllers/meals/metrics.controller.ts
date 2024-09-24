import { makeGetUserMetricsUseCase } from '@/services/factories/make-fetch-user-metrics-use-case';

import type { FastifyReply, FastifyRequest } from "fastify";
export async function metrics(request: FastifyRequest, reply: FastifyReply) {
	const getUserMetrics = makeGetUserMetricsUseCase();

	const userMetrics = await getUserMetrics.execute({
		userId: request.user.sub,
	});

	return reply.status(200).send({ userMetrics });
}
