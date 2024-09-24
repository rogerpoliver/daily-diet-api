import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals.repository';

import { GetMealService } from '../get-meal.service';

export function makeGetMealUseCase() {
	const mealsRepository = new PrismaMealsRepository();
	const useCase = new GetMealService(mealsRepository);

	return useCase;
}
