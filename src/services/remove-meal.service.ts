import type { MealsRepository } from "@/repositories/meals.repository";

import { ResourceNotFoundError } from "./errors/resource-not-found.error";

import type { Meal } from "@prisma/client";

interface RemoveMealServiceRequest {
	mealToBeRemoved: Meal;
}

interface RemoveMealServiceResponse {
	removedMeal: Meal;
}

export class RemoveMealService {
	constructor(private mealsRepository: MealsRepository) {}

	async execute({
		mealToBeRemoved,
	}: RemoveMealServiceRequest): Promise<RemoveMealServiceResponse> {
		const foundMeal = await this.mealsRepository.findById(
			mealToBeRemoved.id,
			mealToBeRemoved.user_id,
		);

		if (!foundMeal) {
			throw new ResourceNotFoundError();
		}

		await this.mealsRepository.remove(mealToBeRemoved);

		return {
			removedMeal: mealToBeRemoved,
		};
	}
}
