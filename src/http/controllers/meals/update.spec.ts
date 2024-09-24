import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe("Update Meal (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to update a meal", async () => {
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

		const [meal] = await prisma.meal.findMany({
			take: 1,
		});

		const response = await request(app.server)
			.put(`/meals/${meal.id}`)
			.set("Authorization", `Bearer ${token}`)
			.send({
				name: "Updated Meal",
				description: "Updated description",
				dateAndTime: "2023-10-01T20:00:00Z",
				isOnDiet: false,
			});

		expect(response.statusCode).toEqual(200);
		expect(response.body.meal.name).toEqual("Updated Meal");
	});
});
