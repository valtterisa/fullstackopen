## 1. Backend API tests (`backend/tests/`)

- **Main file**
  - Keep and expand `backend/tests/person_api.test.js` (you can split it later if it grows too much).
- **Suggested cases**
  - **GET `/api/persons`**
    - Returns **200**.
    - `Content-Type: application/json`.
    - Body is an **array** (optionally assert on length/shape if you seed data).
  - **GET `/api/persons/:id`**
    - Returns **200 + person** when the id exists.
    - Returns **404** when the id does not exist.
  - **GET `/api/info`**
    - Returns **200**.
    - Body includes `"Phonebook"` and the **count** of persons.
  - **POST** `/api/persons`
    - With valid `{ name, number }`:
      - Returns **200/201**.
      - Response has `name`, `number`, `id`.
    - With missing `name`:
      - Returns **400** and `{ error: "name missing" }`.
    - With missing `number`:
      - Returns **400** and `{ error: "number missing" }`.
  - **DELETE `/api/persons/:id`**
    - When person exists:
      - Returns **204**.
      - Follow‑up `GET` for that id returns **404**.
    - When id does not exist:
      - Returns **404**.
  - **PUT `/api/persons`**
    - With valid `{ id, number }`:
      - Returns **200**.
      - Response has the **updated number**.
    - With missing `id` or `number`:
      - Returns **400**.
    - When id does not exist:
      - Returns **404** (if your controller is implemented that way).
- **Implementation notes**
  - Use your existing `request` from `tests/setup.js` and `db.clearDatabase()` in `afterEach` so each test starts from a known state.
  - Create the persons you need **inside the tests** (or in `beforeEach`) and then assert on the responses.

## 2. E2E tests (`e2e/`)

- **Main file**
  - Use `e2e/app.spec.js` (or add `e2e/delete.spec.js`, `e2e/update.spec.js` if you prefer one flow per file).
- **Suggested cases**
  - **List loads**
    - Go to `/`.
    - Expect a known name (e.g. `"Arto Hellas"`) or another seeded person to be visible.
  - **Add person**
    - Fill the **Name** and **Number** inputs.
    - Click **Save**.
    - Expect the new name (and optionally number) to appear in the list.
  - **Delete person**
    - Click **Delete** on a specific person (e.g. the one you just added).
    - Accept the browser confirm dialog.
    - Expect that person’s name to **disappear** from the list.
    - In Playwright, use `page.on('dialog', dialog => dialog.accept())` (or equivalent) so the test can confirm.
  - **Update person**
    - Click **Edit** on a person.
    - Handle the `window.prompt` to enter a new number (Playwright can work with dialogs, or you can stub `prompt` in the page context).
    - Expect the list to show the **updated number** for that person.
    - If `window.prompt` becomes painful to automate, consider a small UI change (e.g. inline edit form) to make E2E easier.
- **How to run E2E**
  - Run with backend + frontend already running (e.g. `pnpm dev`), **or**
  - Use Playwright’s `webServer` option to start them so the app and API are up before tests run.

## 3. Frontend unit tests (optional)

- **Where**
  - For example: `frontend/src/App.test.tsx` or `frontend/src/__tests__/App.test.tsx`, using **Vitest + React Testing Library**.
- **What to test**
  - **Form validation**
    - Submitting with empty name or number shows an error message (e.g. `"Name and number are required"`) and **does not** call the API.
  - **Successful create flow (with mocked API)**
    - Mock `fetch` or your `api.ts` module.
    - After a successful create:
      - The new person appears in the rendered list.
      - The form fields are cleared.
  - **API helpers (optional)**
    - Test `api.ts` in isolation with a mocked `fetch` to verify:
      - Correct **URL** and **HTTP method**.
      - Correct **request body** for create/delete/update.
      - Proper error handling when the backend returns non‑2xx responses.

