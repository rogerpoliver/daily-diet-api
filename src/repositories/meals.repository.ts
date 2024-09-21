import type { Meal, Prisma } from "@prisma/client";

export interface MealsRepository {
	create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>;
	save(meal: Meal): Promise<Meal>;
	findByUser(userId: string): Promise<Meal[] | null>;
	findById(id: string, user_id: string): Promise<Meal | null>;
	remove(id: string, userId: string): Promise<Meal>;
}
