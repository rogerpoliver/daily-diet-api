import { randomUUID } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals.repository";

import { GetMealService } from "./get-meal.service";

let mealsRepository: InMemoryMealsRepository;
let systemUnderTesting: GetMealService;

describe("Fetch Meals by User - Use Case", () => {
	beforeEach(() => {
		mealsRepository = new InMemoryMealsRepository();
		systemUnderTesting = new GetMealService(mealsRepository);

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should get a meal from a user", async () => {
		const userUnderTesting = randomUUID();

		const meal_a = await mealsRepository.create({
			id: randomUUID(),
			user_id: userUnderTesting,
			name: "Lunch",
			description: "Salad and chicken",
			date_and_time: new Date(),
			is_on_diet: true,
		});

		const { meal } = await systemUnderTesting.execute({
			mealId: meal_a.id,
			userId: userUnderTesting,
		});

		expect(meal).toEqual(expect.objectContaining(meal_a));
	});

	it("should not get a meal from another user", async () => {
		const userUnderTesting = randomUUID();
		const anotherUser = randomUUID();

		const meal_a = await mealsRepository.create({
			id: randomUUID(),
			user_id: userUnderTesting,
			name: "Lunch",
			description: "Salad and chicken",
			date_and_time: new Date(),
			is_on_diet: true,
		});

		const meal_b = await mealsRepository.create({
			id: randomUUID(),
			user_id: anotherUser,
			name: "Dinner",
			description: "Cheese pizza",
			date_and_time: new Date(),
			is_on_diet: false,
		});

		const { meal: firstMeal } = await systemUnderTesting.execute({
			mealId: meal_a.id,
			userId: userUnderTesting,
		});

		const { meal: secondMeal } = await systemUnderTesting.execute({
			mealId: meal_b.id,
			userId: userUnderTesting,
		});

		expect(firstMeal).toEqual(expect.objectContaining(meal_a));
		expect(secondMeal).to.be.null;
	});

	it("should return null when there's no meal", async () => {
		const { meal } = await systemUnderTesting.execute({
			mealId: randomUUID(),
			userId: randomUUID(),
		});

		expect(meal).to.be.null;
	});
});
