import { randomUUID } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals.repository";

import { CreateMealService } from "./create-meal.service";

let mealsRepository: InMemoryMealsRepository;
let systemUnderTesting: CreateMealService;

describe("Create Meal - Use Case", () => {
	beforeEach(() => {
		mealsRepository = new InMemoryMealsRepository();
		systemUnderTesting = new CreateMealService(mealsRepository);

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should be create a meal", async () => {
		const { meal } = await systemUnderTesting.execute({
			userId: randomUUID(),
			name: "Dinner",
			description: "Rice, chicken and sweet potatos",
			dateAndTime: new Date(),
			isOnDiet: true,
		});

		expect(meal.id).toEqual(expect.any(String));
		expect(meal.name).toEqual("Dinner");
	});
});
