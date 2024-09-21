import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals.repository';

import { RemoveMealService } from '../remove-meal.service';

export function makeRemoveMealUseCase() {
	const prismaMealsRepository = new PrismaMealsRepository();
	const useCase = new RemoveMealService(prismaMealsRepository);

	return useCase;
}
