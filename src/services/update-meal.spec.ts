import { randomUUID } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals.repository";

import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { UpdateMealService } from "./update-meal.service";

let mealsRepository: InMemoryMealsRepository;
let systemUnderTesting: UpdateMealService;

describe("Update Meal - Use Case", () => {
	beforeEach(() => {
		mealsRepository = new InMemoryMealsRepository();
		systemUnderTesting = new UpdateMealService(mealsRepository);

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should update a meal", async () => {
		const meal = await mealsRepository.create({
			id: randomUUID(),
			userId: randomUUID(),
			name: "Lunch",
			description: "Salad and chicken",
			date_and_time: new Date(),
			is_on_diet: true,
		});

		const updatedMeal = await systemUnderTesting.execute({
			mealId: meal.id,
			name: "Dinner",
			description: "Rice, chicken and sweet potatoes",
		});

		expect(updatedMeal.meal.name).toEqual("Dinner");
		expect(updatedMeal.meal.description).toEqual(
			"Rice, chicken and sweet potatoes",
		);
	});

	it("should throw an error if meal not found", async () => {
		await expect(
			systemUnderTesting.execute({
				mealId: randomUUID(),
				name: "Dinner",
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should update only provided fields", async () => {
		const meal = await mealsRepository.create({
			id: randomUUID(),
			userId: randomUUID(),
			name: "Lunch",
			description: "Salad and chicken",
			date_and_time: new Date(),
			is_on_diet: true,
		});

		const updatedMeal = await systemUnderTesting.execute({
			mealId: meal.id,
			name: "Dinner",
		});

		expect(updatedMeal.meal.name).toEqual("Dinner");
		expect(updatedMeal.meal.description).toEqual("Salad and chicken");
	});
});
