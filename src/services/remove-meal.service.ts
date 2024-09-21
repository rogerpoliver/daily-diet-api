import type { MealsRepository } from "@/repositories/meals.repository";

import type { Meal } from "@prisma/client";
import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface RemoveMealServiceRequest {
	id: string;
	userId: string;
}

interface RemoveMealServiceResponse {
	removedMeal: Meal;
}

export class RemoveMealService {
	constructor(private mealsRepository: MealsRepository) {}

	async execute({
		id,
		userId,
	}: RemoveMealServiceRequest): Promise<RemoveMealServiceResponse> {
		const foundMeal = await this.mealsRepository.findById(id, userId);

		if (!foundMeal) {
			throw new ResourceNotFoundError();
		}

		await this.mealsRepository.remove(id, userId);

		return {
			removedMeal: foundMeal,
		};
	}
}
