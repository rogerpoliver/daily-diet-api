import { randomUUID } from 'node:crypto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals.repository';

import { FetchUserMetricsService } from './fetch-user-metrics.service';

let mealsRepository: InMemoryMealsRepository;
let systemUnderTesting: FetchUserMetricsService;

describe("Fetch user metrics - Use Case", () => {
	beforeEach(() => {
		mealsRepository = new InMemoryMealsRepository();
		systemUnderTesting = new FetchUserMetricsService(mealsRepository);

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should fetch user metrics", async () => {
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

		const metrics = await systemUnderTesting.execute({
			userId: userUnderTesting,
		});

		expect(metrics).toEqual({
			totalMeals: 2,
			onDietMeals: 1,
			offDietMeals: 1,
			bestSequenceOnDiet: 1,
		});
	});

	it("should return zero metrics for a user with no meals", async () => {
		const userUnderTesting = randomUUID();

		const metrics = await systemUnderTesting.execute({
			userId: userUnderTesting,
		});

		expect(metrics).toEqual({
			totalMeals: 0,
			onDietMeals: 0,
			offDietMeals: 0,
			bestSequenceOnDiet: 0,
		});
	});

	it("should handle multiple on-diet meals correctly", async () => {
		const userUnderTesting = randomUUID();

		await mealsRepository.create({
			id: randomUUID(),
			user_id: userUnderTesting,
			name: "Breakfast",
			description: "Oatmeal",
			date_and_time: new Date(),
			is_on_diet: true,
		});

		await mealsRepository.create({
			id: randomUUID(),
			user_id: userUnderTesting,
			name: "Lunch",
			description: "Salad",
			date_and_time: new Date(),
			is_on_diet: true,
		});

		await mealsRepository.create({
			id: randomUUID(),
			user_id: userUnderTesting,
			name: "Dinner",
			description: "Grilled chicken",
			date_and_time: new Date(),
			is_on_diet: true,
		});

		const metrics = await systemUnderTesting.execute({
			userId: userUnderTesting,
		});

		expect(metrics).toEqual({
			totalMeals: 3,
			onDietMeals: 3,
			offDietMeals: 0,
			bestSequenceOnDiet: 3,
		});
	});

	it("should handle multiple off-diet meals correctly", async () => {
		const userUnderTesting = randomUUID();

		await mealsRepository.create({
			id: randomUUID(),
			user_id: userUnderTesting,
			name: "Breakfast",
			description: "Pancakes",
			date_and_time: new Date(),
			is_on_diet: false,
		});

		await mealsRepository.create({
			id: randomUUID(),
			user_id: userUnderTesting,
			name: "Lunch",
			description: "Burger",
			date_and_time: new Date(),
			is_on_diet: false,
		});

		await mealsRepository.create({
			id: randomUUID(),
			user_id: userUnderTesting,
			name: "Dinner",
			description: "Pizza",
			date_and_time: new Date(),
			is_on_diet: false,
		});

		const metrics = await systemUnderTesting.execute({
			userId: userUnderTesting,
		});

		expect(metrics).toEqual({
			totalMeals: 3,
			onDietMeals: 0,
			offDietMeals: 3,
			bestSequenceOnDiet: 0,
		});
	});

	it("should handle mixed on-diet and off-diet meals correctly", async () => {
		const userUnderTesting = randomUUID();

		await mealsRepository.create({
			id: randomUUID(),
			user_id: userUnderTesting,
			name: "Breakfast",
			description: "Oatmeal",
			date_and_time: new Date(),
			is_on_diet: true,
		});

		await mealsRepository.create({
			id: randomUUID(),
			user_id: userUnderTesting,
			name: "Lunch",
			description: "Burger",
			date_and_time: new Date(),
			is_on_diet: false,
		});

		await mealsRepository.create({
			id: randomUUID(),
			user_id: userUnderTesting,
			name: "Dinner",
			description: "Salad",
			date_and_time: new Date(),
			is_on_diet: true,
		});

		const metrics = await systemUnderTesting.execute({
			userId: userUnderTesting,
		});

		expect(metrics).toEqual({
			totalMeals: 3,
			onDietMeals: 2,
			offDietMeals: 1,
			bestSequenceOnDiet: 1,
		});
	});

	it("should handle a sequence of on-diet meals correctly", async () => {
		const userUnderTesting = randomUUID();

		await mealsRepository.create({
			id: randomUUID(),
			user_id: userUnderTesting,
			name: "Breakfast",
			description: "Oatmeal",
			date_and_time: new Date(),
			is_on_diet: true,
		});

		await mealsRepository.create({
			id: randomUUID(),
			user_id: userUnderTesting,
			name: "Lunch",
			description: "Chocolate Cake",
			date_and_time: new Date(),
			is_on_diet: false,
		});

		await mealsRepository.create({
			id: randomUUID(),
			user_id: userUnderTesting,
			name: "Snack",
			description: "Fruit",
			date_and_time: new Date(),
			is_on_diet: true,
		});

		await mealsRepository.create({
			id: randomUUID(),
			user_id: userUnderTesting,
			name: "Dinner",
			description: "Grilled chicken",
			date_and_time: new Date(),
			is_on_diet: true,
		});

		const metrics = await systemUnderTesting.execute({
			userId: userUnderTesting,
		});

		expect(metrics).toEqual({
			totalMeals: 4,
			onDietMeals: 3,
			offDietMeals: 1,
			bestSequenceOnDiet: 2,
		});
	});
});
