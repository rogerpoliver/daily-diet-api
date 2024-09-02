import { randomUUID } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals.repository";

import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { RemoveMealService } from "./remove-meal.service";

let mealsRepository: InMemoryMealsRepository;
let systemUnderTesting: RemoveMealService;

describe("Remove Meal - Use Case", () => {
	beforeEach(() => {
		mealsRepository = new InMemoryMealsRepository();
		systemUnderTesting = new RemoveMealService(mealsRepository);

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should remove a meal", async () => {
		const mealToBeRemoved = await mealsRepository.create({
			id: randomUUID(),
			user_id: randomUUID(),
			name: "Lunch",
			description: "Salad and chicken",
			date_and_time: new Date(),
			is_on_diet: true,
		});

		await systemUnderTesting.execute({
			mealToBeRemoved,
		});

		const userMeals = await mealsRepository.findByUser(mealToBeRemoved.user_id);

		expect(userMeals).not.toContainEqual(mealToBeRemoved);

		expect(userMeals?.length).toBe(0);
	});

	it("should throw an error if meal not found", async () => {
		await expect(
			systemUnderTesting.execute({
				mealToBeRemoved: {
					id: randomUUID(),
					user_id: randomUUID(),
					name: "Lunch",
					description: "Salad and chicken",
					date_and_time: new Date(),
					is_on_diet: true,
					created_at: new Date(),
					updated_at: new Date(),
				},
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
