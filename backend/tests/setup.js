import { beforeAll, afterEach, afterAll } from "vitest";
import supertest from "supertest";

import * as db from "./database";
const app = require("../app");

let request;

beforeAll(async () => {
  await db.connect();
  request = supertest(app);
});

afterEach(async () => {
  await db.clearDatabase();
});

afterAll(async () => {
  await db.closeDatabase();
});

export { request };
