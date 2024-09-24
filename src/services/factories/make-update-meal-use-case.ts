import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals.repository';

import { UpdateMealService } from '../update-meal.service';

export function makeUpdateMealUseCase() {
	const mealsRepository = new PrismaMealsRepository();
	const useCase = new UpdateMealService(mealsRepository);

	return useCase;
}
