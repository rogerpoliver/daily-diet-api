import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals.repository';

import { CreateMealService } from '../create-meal.service';

export function makeCreateMealUseCase() {
	const mealsRepository = new PrismaMealsRepository();
	const useCase = new CreateMealService(mealsRepository);

	return useCase;
}
