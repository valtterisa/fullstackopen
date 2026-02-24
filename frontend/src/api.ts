import type { Person } from "./types.ts";

const baseUrl = "/api/persons";

export async function fetchPersons(): Promise<Person[]> {
  const res = await fetch(baseUrl);
  if (!res.ok) {
    throw new Error("Failed to load persons");
  }
  return res.json();
}

export async function createPerson(input: Omit<Person, "id">): Promise<Person> {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(data?.error ?? "Failed to create person");
  }

  return res.json();
}

export async function deletePerson(id: number): Promise<void> {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok && res.status !== 404) {
    throw new Error("Failed to delete person");
  }
}

export async function updateNumber(input: Person): Promise<Person> {
  const res = await fetch(baseUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(data?.error ?? "Failed to update person");
  }

  return res.json();
}