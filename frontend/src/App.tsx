import { type SubmitEvent, useEffect, useState } from "react";
import { createPerson, deletePerson, fetchPersons } from "./api.ts";
import type { Person } from "./types.ts";
import "./App.css";

type Status = "idle" | "loading" | "error";

interface Notification {
  type: "success" | "error";
  message: string;
}

function App() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    setStatus("loading");
    fetchPersons()
      .then(setPersons)
      .catch(() => {
        setNotification({
          type: "error",
          message: "Could not load phonebook data.",
        });
        setStatus("error");
      })
      .finally(() => {
        setStatus("idle");
      });
  }, []);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !number.trim()) {
      setNotification({
        type: "error",
        message: "Name and number are required.",
      });
      return;
    }

    setStatus("loading");
    createPerson({ name: name.trim(), number: number.trim() })
      .then((created) => {
        setPersons((prev) => prev.concat(created));
        setName("");
        setNumber("");
        setNotification({
          type: "success",
          message: `Added ${created.name} to the phonebook.`,
        });
      })
      .catch((error: unknown) => {
        const message =
          error instanceof Error ? error.message : "Failed to save contact.";
        setNotification({ type: "error", message });
      })
      .finally(() => {
        setStatus("idle");
      });
  }

  function handleDelete(person: Person) {
    if (!window.confirm(`Delete ${person.name}?`)) {
      return;
    }

    setStatus("loading");
    deletePerson(person.id)
      .then(() => {
        setPersons((prev) => prev.filter((p) => p.id !== person.id));
        setNotification({
          type: "success",
          message: `Deleted ${person.name}.`,
        });
      })
      .catch(() => {
        setNotification({
          type: "error",
          message: "Failed to delete contact.",
        });
      })
      .finally(() => {
        setStatus("idle");
      });
  }

  function clearNotification() {
    setNotification(null);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Phonebook</h1>
        {status === "loading" && <span className="badge">Loading…</span>}
      </header>

      {notification && (
        <div
          className={`notification notification-${notification.type}`}
          role="status"
          onClick={clearNotification}
        >
          {notification.message}
        </div>
      )}

      <section className="card">
        <h2>Add new</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ada Lovelace"
              autoComplete="off"
            />
          </div>
          <div className="field">
            <label htmlFor="number">Number</label>
            <input
              id="number"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
              placeholder="39-44-5323523"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="primary-button"
            disabled={status === "loading"}
          >
            Save
          </button>
        </form>
      </section>

      <section className="card">
        <h2>Numbers</h2>
        {persons.length === 0 ? (
          <p className="empty">No entries yet.</p>
        ) : (
          <ul className="list">
            {persons.map((person) => (
              <li key={person.id} className="list-item">
                <div>
                  <div className="list-name">{person.name}</div>
                  <div className="list-number">{person.number}</div>
                </div>
                <button
                  type="button"
                  className="ghost-button"
                  onClick={() => handleDelete(person)}
                  disabled={status === "loading"}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
