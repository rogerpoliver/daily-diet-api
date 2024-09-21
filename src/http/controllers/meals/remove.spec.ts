import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe("Remove Meal (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to remove a specific meal", async () => {
		const { token } = await createAndAuthenticateUser(app);

		await request(app.server)
			.post("/meals")
			.set("Authorization", `Bearer ${token}`)
			.send({
				name: "Evening Meal",
				description: "Grilled chicken with steamed vegetables",
				dateAndTime: "2023-10-01T19:00:00Z",
				isOnDiet: true,
			});

		await request(app.server)
			.post("/meals")
			.set("Authorization", `Bearer ${token}`)
			.send({
				name: "Morning Meal",
				description: "Bacon and Beans",
				dateAndTime: "2023-10-01T08:00:00Z",
				isOnDiet: false,
			});

		await request(app.server)
			.post("/meals")
			.set("Authorization", `Bearer ${token}`)
			.send({
				name: "Lunch Meal",
				description: "Salad and Fish",
				dateAndTime: "2023-10-01T12:00:00Z",
				isOnDiet: true,
			});

		const mealToBeRemoved = await prisma.meal.findFirst({
			where: {
				name: "Morning Meal",
			},
		});

		const deleteResponse = await request(app.server)
			.delete(`/meals/${mealToBeRemoved?.id}`)
			.set("Authorization", `Bearer ${token}`)
			.send();

		expect(deleteResponse.statusCode).toEqual(204);

		const remainingMealsResponse = await request(app.server)
			.get("/meals")
			.set("Authorization", `Bearer ${token}`);

		expect(remainingMealsResponse.statusCode).toEqual(200);
		const remainingMeals = remainingMealsResponse.body.meals;

		expect(remainingMeals).toHaveLength(2);
		expect(remainingMeals).toEqual(
			expect.not.arrayContaining([
				expect.objectContaining({ id: mealToBeRemoved?.id }),
			]),
		);
	});
});
