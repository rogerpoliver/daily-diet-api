import { prisma } from "@/lib/prisma";

import type { Meal, Prisma } from "@prisma/client";

import type { MealsRepository } from "../meals.repository";

export class PrismaMealsRepository implements MealsRepository {
	remove(meal: Meal): Promise<Meal> {
		throw new Error("Method not implemented.");
	}
	async create(data: Prisma.MealCreateInput) {
		return await prisma.meal.create({ data });
	}

	save(meal: Meal): Promise<Meal> {
		throw new Error("Method not implemented.");
	}

	findByUser(userId: string): Promise<Meal[] | null> {
		throw new Error("Method not implemented.");
	}

	findById(id: string, userId: string): Promise<Meal | null> {
		throw new Error("Method not implemented.");
	}
}
