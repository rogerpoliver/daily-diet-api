import type { Meal, Prisma } from "@prisma/client";

export interface MealsRepository {
	create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>;
	edit(id: string): Promise<Meal>;
	findAll(userId: string): Promise<Meal[] | null>;
	findById(id: string): Promise<Meal | null>;
}
