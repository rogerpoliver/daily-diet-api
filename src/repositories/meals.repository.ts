import type { Meal, Prisma } from "@prisma/client";

export interface MealsRepository {
	create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>;
	save(meal: Meal): Promise<Meal>;
	findAll(userId: string): Promise<Meal[] | null>;
	findById(id: string): Promise<Meal | null>;
	remove(meal: Meal): Promise<Meal>;
}
