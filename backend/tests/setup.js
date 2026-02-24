import { beforeAll, afterEach, afterAll } from "vitest";
import supertest from "supertest";

import * as db from "./database";
const app = require("../app");
const { connectMongo } = require("../db/mongo");

let request;

beforeAll(async () => {
  await connectMongo();
  request = supertest(app);
});

afterEach(async () => {
  await db.clearDatabase();
});

afterAll(async () => {
  await db.closeDatabase();
});

export { request };
