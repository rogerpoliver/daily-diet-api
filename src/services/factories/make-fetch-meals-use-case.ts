import { PrismaMealsRepository } from "@/repositories/prisma/prisma-meals.repository";

import { FetchMealsService } from "../fetch-meals.service";

export function makeFetchMealsUseCase() {
	const prismaMealsRepository = new PrismaMealsRepository();
	const useCase = new FetchMealsService(prismaMealsRepository);

	return useCase;
}
