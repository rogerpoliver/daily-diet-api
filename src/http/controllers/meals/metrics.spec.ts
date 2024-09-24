import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe("Fetch User Metrics (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to fetch user metrics", async () => {
		const { token } = await createAndAuthenticateUser(app);

		const meals = [
			{
				name: "Evening Meal",
				description: "Grilled chicken with steamed vegetables",
				dateAndTime: "2023-10-01T19:00:00Z",
				isOnDiet: true,
			},
			{
				name: "Morning Meal",
				description: "Bacon and Beans",
				dateAndTime: "2023-10-01T08:00:00Z",
				isOnDiet: false,
			},
			{
				name: "Lunch",
				description: "Salad with chicken",
				dateAndTime: "2023-10-01T12:00:00Z",
				isOnDiet: true,
			},
		];

		for (const meal of meals) {
			await request(app.server)
				.post("/meals")
				.set("Authorization", `Bearer ${token}`)
				.send(meal);
		}

		const {
			body: { userMetrics },
			statusCode,
		} = await request(app.server)
			.get("/meals/metrics")
			.set("Authorization", `Bearer ${token}`);

		expect(statusCode).toEqual(200);
		expect(userMetrics).toHaveProperty("totalMeals", 3);
		expect(userMetrics).toHaveProperty("onDietMeals", 2);
		expect(userMetrics).toHaveProperty("offDietMeals", 1);
		expect(userMetrics).toHaveProperty("bestSequenceOnDiet", 1);
	});
});
