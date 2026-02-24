import { describe, it, expect, afterAll } from "vitest";
import { request } from "./setup";

describe("persons API", () => {
  it("returns JSON", async () => {
    await request
      .get("/api/persons")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});
