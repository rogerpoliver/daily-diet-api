import type { MealsRepository } from "@/repositories/meals.repository";
import type { Meal } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";

interface UpdateMealServiceRequest extends Partial<Omit<Meal, "id">> {
	mealId: string;
}

interface UpdateMealServiceResponse {
	meal: Meal;
}

export class UpdateMealService {
	constructor(private mealsRepository: MealsRepository) {}

	async execute({
		mealId,
		...updateData
	}: UpdateMealServiceRequest): Promise<UpdateMealServiceResponse> {
		const foundMeal = await this.mealsRepository.findById(mealId);

		if (!foundMeal) {
			throw new ResourceNotFoundError();
		}

		const updatedMealData = {
			...foundMeal,
			...updateData,
			id: foundMeal.id,
		};

		const meal = await this.mealsRepository.save(updatedMealData);

		return {
			meal,
		};
	}
}
