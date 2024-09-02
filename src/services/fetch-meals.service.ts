import type { MealsRepository } from "@/repositories/meals.repository";
import type { Meal } from "@prisma/client";

interface FetchMealsServiceRequest {
	userId: string;
}

interface FetchMealsServiceResponse {
	meals: Meal[] | null;
}

export class FetchMealsService {
	constructor(private mealsRepository: MealsRepository) {}

	async execute({
		userId,
	}: FetchMealsServiceRequest): Promise<FetchMealsServiceResponse> {
		const meals = await this.mealsRepository.findByUser(userId);

		return {
			meals,
		};
	}
}
