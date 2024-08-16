Template Repository

<!-- Edit this -->
<!-- ![Unit Tests badge](https://github.com/rogerpoliver/repo-name/actions/workflows/unit-tests.yml/badge.svg) -->


<details>
  <summary>Functional Requirements</summary>

- [x] Must be possible to register;
- [x] Must be possible to authenticate;
- [x] Must be possible to retrieve the profile of a logged-in user;

TBD

</details>

<details>
  <summary>Business Rules</summary>
  
- [x] user must not be able to register with a duplicate email;

TBD

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