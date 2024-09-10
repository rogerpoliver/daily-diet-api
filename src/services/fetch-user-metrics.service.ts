import type { MealsRepository } from "@/repositories/meals.repository";

interface FetchUserMetricsServiceRequest {
	userId: string;
}

interface FetchUserMetricsServiceResponse {
	totalMeals: number;
	onDietMeals: number;
	offDietMeals: number;
	bestSequenceOnDiet: number;
}

export class FetchUserMetricsService {
	constructor(private mealsRepository: MealsRepository) {}

	async execute({
		userId,
	}: FetchUserMetricsServiceRequest): Promise<FetchUserMetricsServiceResponse> {
		const meals = await this.mealsRepository.findByUser(userId);

		const userMetrics: FetchUserMetricsServiceResponse = {
			totalMeals: 0,
			onDietMeals: 0,
			offDietMeals: 0,
			bestSequenceOnDiet: 0,
		};

		if (meals) {
			userMetrics.totalMeals = meals.length;
			userMetrics.onDietMeals = meals.filter((meal) => meal.is_on_diet).length;
			userMetrics.offDietMeals =
				userMetrics.totalMeals - userMetrics.onDietMeals;

			let currentSequence = 0;

			for (const meal of meals) {
				if (meal.is_on_diet) {
					currentSequence++;
					if (currentSequence > userMetrics.bestSequenceOnDiet) {
						userMetrics.bestSequenceOnDiet = currentSequence;
					}
				} else {
					currentSequence = 0;
				}
			}
		}

		return userMetrics;
	}
}
