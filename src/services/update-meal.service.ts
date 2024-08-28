import type { MealsRepository } from "@/repositories/meals.repository";

import { ResourceNotFoundError } from "./errors/resource-not-found.error";

import type { Meal } from "@prisma/client";

interface UpdateMealServiceRequest {
	mealId: string;
	name?: string;
	description?: string;
	date_and_time?: Date;
	is_on_diet?: boolean;
}

interface UpdateMealServiceResponse {
	meal: Meal;
}

export class UpdateMealService {
	constructor(private mealsRepository: MealsRepository) {}

	async execute({
		mealId,
		name,
		description,
		date_and_time,
		is_on_diet,
	}: UpdateMealServiceRequest): Promise<UpdateMealServiceResponse> {
		const meal = await this.mealsRepository.findById(mealId);

		if (!meal) {
			throw new ResourceNotFoundError();
		}

		await this.mealsRepository.save({
			...meal,
			...(name !== undefined && { name }),
			...(description !== undefined && { description }),
			...(date_and_time !== undefined && { date_and_time }),
			...(is_on_diet !== undefined && { is_on_diet }),
		});

		return {
			meal,
		};
	}
}
