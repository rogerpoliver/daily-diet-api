import type { MealsRepository } from "@/repositories/meals.repository";
import type { Meal } from "@prisma/client";

interface GetMealServiceRequest {
	mealId: string;
	userId: string;
}

interface GetMealServiceResponse {
	meal: Meal | null;
}

export class GetMealService {
	constructor(private mealsRepository: MealsRepository) {}

	async execute({
		mealId,
		userId,
	}: GetMealServiceRequest): Promise<GetMealServiceResponse> {
		const meal = await this.mealsRepository.findById(mealId, userId);

		return {
			meal,
		};
	}
}
