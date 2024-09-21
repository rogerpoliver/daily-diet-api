import { prisma } from '@/lib/prisma';

import type { Meal, Prisma } from "@prisma/client";

import type { MealsRepository } from "../meals.repository";

export class PrismaMealsRepository implements MealsRepository {
	async remove(id: string, userId: string) {
		return await prisma.meal.deleteMany({
			where: {
				id: id,
				user_id: userId,
			},
		});
	}

	async create(data: Prisma.MealCreateInput) {
		return await prisma.meal.create({ data });
	}

	async save(meal: Meal): Promise<Meal> {
		return await prisma.meal.update({
			where: {
				id: meal.id,
			},
			data: meal,
		});
	}

	async findByUser(userId: string): Promise<Meal[] | null> {
		const userMeals = await prisma.meal.findMany({
			where: {
				user_id: userId,
			},
		});

		return userMeals ?? [];
	}

	async findById(id: string, userId: string): Promise<Meal | null> {
		const meal = await prisma.meal.findUnique({
			where: { id, user_id: userId },
		});

		return meal ?? null;
	}
}
