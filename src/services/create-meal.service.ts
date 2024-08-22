import type { MealsRepository } from "@/repositories/meals.repository";

import type { Meal } from "@prisma/client";

interface CreateMealServiceRequest {
	userId: string;
	name: string;
	description: string;
	dateAndTime: Date;
	isOnDiet: boolean;
}

interface CreateMealServiceResponse {
	meal: Meal;
}

export class CreateMealService {
	constructor(private mealsRepository: MealsRepository) {}

	async execute({
		userId,
		name,
		description,
		dateAndTime,
		isOnDiet,
	}: CreateMealServiceRequest): Promise<CreateMealServiceResponse> {
		const meal = await this.mealsRepository.create({
			user_id: userId,
			name,
			description,
			date_and_time: dateAndTime,
			is_on_diet: isOnDiet,
		});

		return {
			meal,
		};
	}
}
