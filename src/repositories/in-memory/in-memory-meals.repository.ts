import type { Meal, Prisma } from "@prisma/client";

import { randomUUID } from 'node:crypto';

import type { MealsRepository } from "../meals.repository";

export class InMemoryMealsRepository implements MealsRepository {
	public items: Meal[] = [];

	async create(data: Prisma.MealUncheckedCreateInput) {
		const meal = {
			id: randomUUID(),
			name: data.name,
			description: data.description ?? null,
			date_and_time: data.date_and_time ? new Date(data.date_and_time) : null,
			is_on_diet: data.is_on_diet ?? null,
			created_at: new Date(),
			updated_at: new Date(),
			user_id: data.user_id,
		};

		this.items.push(meal);

		return meal;
	}

	async save(meal: Meal): Promise<Meal> {
		const mealIndex = this.items.findIndex((item) => item.id === meal.id);

		this.items[mealIndex] = meal;

		return meal;
	}

	async findByUser(userId: string): Promise<Meal[] | null> {
		const userMeals = this.items.filter((item) => item.user_id === userId);
		return userMeals ?? [];
	}

	async findById(id: string, userId: string): Promise<Meal | null> {
		const meal = this.items.find(
			(item) => item.id === id && item.user_id === userId,
		);

		return meal ?? null;
	}

	async remove(id: string, userId: string): Promise<Meal> {
		const mealIndex = this.items.findIndex(
			(item) => item.id === id && item.user_id === userId,
		);

		if (mealIndex === -1) {
			throw new Error("Meal not found");
		}

		const [removedMeal] = this.items.splice(mealIndex, 1);
		return removedMeal;
	}
}
