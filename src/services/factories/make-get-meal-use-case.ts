import { PrismaMealsRepository } from "@/repositories/prisma/prisma-meals.repository";

import { GetMealService } from "../get-meal.service";

export function makeGetMealUseCase() {
	const prismaMealsRepository = new PrismaMealsRepository();
	const useCase = new GetMealService(prismaMealsRepository);

	return useCase;
}
