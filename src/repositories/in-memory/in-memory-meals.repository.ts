import { randomUUID } from 'node:crypto';

import type { Meal, Prisma } from "@prisma/client";

import type { MealsRepository } from "../meals.repository";

export class InMemoryMealsRepository implements MealsRepository {
	public items: Meal[] = [];

	async create(data: Prisma.MealUncheckedCreateInput) {
		const meal = {
			id: randomUUID(),
			name: data.name,
			description: data.description ?? null,
			date_and_time: data.date_and_time ?? null,
			is_diet: data.is_diet ?? null,
			created_at: new Date(),
			updated_at: new Date(),
			user_id: data.user_id,
		};

		this.items.push(meal);

		return meal;
	}

	async edit(id: string): Promise<Meal> {
		throw new Error("Method not implemented.");
	}

	async findAll(userId: string): Promise<Meal[] | null> {
		throw new Error("Method not implemented.");
	}

	async findById(id: string): Promise<Meal | null> {
		throw new Error("Method not implemented.");
	}
}
