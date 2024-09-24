import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals.repository';

import { FetchUserMetricsService } from '../fetch-user-metrics.service';

export function makeGetUserMetricsUseCase() {
	const mealsRepository = new PrismaMealsRepository();
	const useCase = new FetchUserMetricsService(mealsRepository);

	return useCase;
}
