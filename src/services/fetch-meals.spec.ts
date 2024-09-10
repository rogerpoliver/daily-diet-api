import { randomUUID } from 'node:crypto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals.repository';

import { FetchMealsService } from './fetch-meals.service';

let mealsRepository: InMemoryMealsRepository;
let systemUnderTesting: FetchMealsService;

describe("Fetch Meals by User - Use Case", () => {
	beforeEach(() => {
		mealsRepository = new InMemoryMealsRepository();
		systemUnderTesting = new FetchMealsService(mealsRepository);

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should fetch all meals from a user", async () => {
		const userUnderTesting = randomUUID();

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
			user_id: userUnderTesting,
			name: "Dinner",
			description: "Cheese pizza",
			date_and_time: new Date(),
			is_on_diet: false,
		});

		const { meals } = await systemUnderTesting.execute({
			userId: userUnderTesting,
		});

		expect(meals).toHaveLength(2);
		expect(meals).toEqual([
			expect.objectContaining(meal_a),
			expect.objectContaining(meal_b),
		]);
	});

	it("should not fetch meals from another user", async () => {
		const userUnderTesting = randomUUID();
		const anotherUser = randomUUID();

		const meal_a = await mealsRepository.create({
			id: randomUUID(),
			user_id: anotherUser,
			name: "Lunch",
			description: "Salad and chicken",
			date_and_time: new Date(),
			is_on_diet: true,
		});

		const meal_b = await mealsRepository.create({
			id: randomUUID(),
			user_id: userUnderTesting,
			name: "Dinner",
			description: "Cheese pizza",
			date_and_time: new Date(),
			is_on_diet: false,
		});

		const meal_c = await mealsRepository.create({
			id: randomUUID(),
			user_id: anotherUser,
			name: "Breakfast",
			description: "Bacon and beans",
			date_and_time: new Date(),
			is_on_diet: true,
		});

		const { meals } = await systemUnderTesting.execute({
			userId: userUnderTesting,
		});

		expect(meals).toHaveLength(1);
		expect(meals).toEqual([expect.objectContaining(meal_b)]);
		expect(meals).to.not.contain([meal_a, meal_c]);
	});

	it("should return a empty list when there's no meals", async () => {
		const userUnderTesting = randomUUID();

		const { meals } = await systemUnderTesting.execute({
			userId: userUnderTesting,
		});

		expect(meals).to.be.empty;
	});
});
