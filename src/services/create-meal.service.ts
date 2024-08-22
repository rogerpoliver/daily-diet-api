import type { MealsRepository } from "@/repositories/meals.repository";

import type { Meal } from "@prisma/client";

interface CreateMealServiceRequest {
	name: string;
	description: string;
	dateAndTime: Date;
	isDiet: boolean;
}

interface CreateMealServiceResponse {
	meal: Meal;
}

export class CreateMealService {
	constructor(private mealsRepository: MealsRepository) {}

	async execute({
		name,
		description,
		dateAndTime,
		isDiet,
	}: CreateMealServiceRequest): Promise<CreateMealServiceResponse> {
		const meal = await this.mealsRepository.create({
			name,
			description,
			date_and_time: dateAndTime,
			is_diet: isDiet,
		});

		return {
			meal,
		};
	}
}
