import { prisma } from '@/lib/prisma';

import type { Meal, Prisma } from "@prisma/client";

import type { MealsRepository } from "../meals.repository";

export class PrismaMealsRepository implements MealsRepository {
	async create(data: Prisma.MealCreateInput) {
		return await prisma.meal.create({ data });
	}

	edit(id: string): Promise<Meal> {
		throw new Error("Method not implemented.");
	}

	findAll(userId: string): Promise<Meal[] | null> {
		throw new Error("Method not implemented.");
	}

	findById(id: string): Promise<Meal | null> {
		throw new Error("Method not implemented.");
	}
}
