Daily Diet API
[![Unit Tests](https://github.com/rogerpoliver/daily-diet-api/actions/workflows/run-unit-tests.yml/badge.svg)](https://github.com/rogerpoliver/daily-diet-api/actions/workflows/run-unit-tests.yml)
[![End to End Tests](https://github.com/rogerpoliver/daily-diet-api/actions/workflows/run-e2e-tests.yml/badge.svg)](https://github.com/rogerpoliver/daily-diet-api/actions/workflows/run-e2e-tests.yml)
<!-- Edit this -->
<!-- ![Unit Tests badge](https://github.com/rogerpoliver/repo-name/actions/workflows/unit-tests.yml/badge.svg) -->


<details>
  <summary>Functional Requirements</summary>

- [x] Must be possible to register;
- [x] Must be possible to authenticate;
- [x] Must be possible to retrieve the profile of a logged-in user;
- [x] Must be possible to create a user;
- [x] Must be possible to register a meal with the following details:
  - Name
  - Description
  - Date and Time
  - Whether it is within the diet or not
  - *Meals must be related to a user.*
- [x] Must be possible to edit a meal, allowing all details above to be changed;
- [x] Must be possible to delete a meal;
- [x] Must be possible to list all meals of a user;
- [ ] Must be possible to view a single meal;
- [ ] Must be possible to retrieve the user's metrics:
  - Total number of meals registered;
  - Total number of meals within the diet;
  - Total number of meals outside the diet;
  - Best sequence of meals within the diet;

</details>

<details>
  <summary>Business Rules</summary>
  
- [x] User must not be able to register with a duplicate email;
- [ ] The user can only view, edit, and delete the meals they created;

</details>

<details>
  <summary>Non-functional Requirements</summary>

- [x] The user's password needs to be encrypted;
- [x] Application data needs to be persisted in a PostgreSQL database;
- [x] The user must be identified by a JWT (JSON Web Token);

</details>


## Running the API

```sh
npm ci
```

```sh
docker-compose up
```

```sh
npm run prisma:migrate-prod
```

```sh
npm start:dev
```

## Running tests
For unit testing
```sh
npm run test
```

For end to end testing
```sh
npm run test:e2e
```