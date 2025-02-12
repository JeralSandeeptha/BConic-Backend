# Getting started to setup and run Express API Locally

Prequsites
`Nodejs`
`PostgeSQL`
`PgAdmin`
`Typescript`

Clone the Github Repository.

### `npm install` in the root folder.

Create a Database called CourierService Database and tables in PgAdmin.
For that run the SQL file which attached.

Create .env file in the root folder and add below variables.
### `DATABASE_URL=postgres://postgres:1234@localhost:5432/CourierService`
### `PORT=5000`
### `JWT_SECRET=secret`

In the project directory, you can run:
### `npx tsx src/index.ts` 
to run project locally.

Runs the app in the local development mode.
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

## For the testing setup. 

-  Firt need to install related dependencies.
```bash
npm i jest ts-jest @types/jest supertest @types/supertest

- Then we need to configure the jest. For that,
```bash
npx ts-jest config:init

- Then we need to add a script for testing.
```bash
"test": "jest"

- If we want confinous watching for test files
```bash
"test": "jest --watchAll"


