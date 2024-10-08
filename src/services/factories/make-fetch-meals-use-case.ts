import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals.repository';

import { FetchMealsService } from '../fetch-meals.service';

export function makeFetchMealsUseCase() {
	const mealsRepository = new PrismaMealsRepository();
	const useCase = new FetchMealsService(mealsRepository);

	return useCase;
}
