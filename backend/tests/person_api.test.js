import { describe, it, expect } from "vitest";
import { request } from "./setup";

describe("API tests", () => {
  describe("GET /api/persons", () => {
    it("returns JSON", async () => {
      await request
        .get("/api/persons")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });
  });

  describe("GET /api/persons/:id", () => {
    it("returns 200 + JSON when person exists", async () => {
      await request
        .get("/api/persons/1")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    it("returns 404 if person not found", async () => {
      await request.get("/api/persons/99999999").expect(404);
    });
  });

  describe("GET /api/info", () => {
    it("returns HTML with count", async () => {
      const res = await request.get("/api/info").expect(200);

      expect(res.headers["content-type"]).toMatch(/text\/html/);
      expect(res.text).toContain("Phonebook has info for");
    });
  });

  describe("POST /api/persons", () => {
    it("200 + returns created person when name+number are provided", async () => {
      const payload = { name: "Ada", number: "123" };

      const res = await request
        .post("/api/persons")
        .send(payload)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(res.body).toMatchObject(payload);
      expect(res.body).toHaveProperty("id");
      expect(typeof res.body.id).toBe("number");
    });

    it("400 + error message if name is missing", async () => {
      const payload = { number: "123" };

      const res = await request
        .post("/api/persons")
        .send(payload)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(res.body).toEqual({ error: "name missing" });
    });

    it("400 + error message if number is missing", async () => {
      const payload = { name: "Ada" };

      const res = await request
        .post("/api/persons")
        .send(payload)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(res.body).toEqual({ error: "number missing" });
    });
  });

  describe("DELETE /api/persons/:id", () => {
    it("204 if person exists", async () => {
      await request.delete("/api/persons/1").expect(204);
      await request.get("/api/persons/1").expect(404);
    });

    it("404 if person does not exist", async () => {
      await request.delete("/api/persons/99999999").expect(404);
    });
  });

  describe("PUT /api/persons", () => {
    it("200 and returns updated person when it exists", async () => {
      const updateRes = await request
        .put("/api/persons")
        .send({ id: 1, number: "123" })
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(updateRes.body).toMatchObject({
        id: 1,
        name: "Valtteri Savonen",
        number: "123",
      });
    });

    it("400 when id is missing", async () => {
      const res = await request
        .put("/api/persons")
        .send({ number: "123" })
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(res.body).toEqual({ error: "id missing" });
    });

    it("400 when number is missing", async () => {
      const res = await request
        .put("/api/persons")
        .send({ id: 1 })
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(res.body).toEqual({ error: "number missing" });
    });
  });
});
