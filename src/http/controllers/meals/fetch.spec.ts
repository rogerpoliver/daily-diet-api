import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import type { Meal } from "@prisma/client";

describe("Fetch Meals (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to fetch meals", async () => {
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

		const meals = await prisma.meal.findMany();

		const response = await request(app.server)
			.get("/meals")
			.set("Authorization", `Bearer ${token}`)
			.send();

		expect(response.statusCode).toEqual(200);
		expect(response.body.meals).toHaveLength(2);

		const mealNames = response.body.meals.map((meal: Meal) => meal.name);
		expect(mealNames).toContain("Evening Meal");
		expect(mealNames).toContain("Morning Meal");
	});
});
