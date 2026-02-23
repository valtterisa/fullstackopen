const express = require("express");
const app = express();
const port = 3001;
var morgan = require("morgan");

app.use(express.json());

morgan.token("body", (req) => JSON.stringify(req.body));

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body",
    {
      skip: (req) => req.method !== "POST",
    },
  ),
);

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms"),
);

const data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (req, res) => {
  res.send(
    "Phonebook has info for " + data.length + " people <br><br>" + new Date(),
  );
});

app.get("/api/persons", (req, res) => {
  res.json(data);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  if (!data.find((person) => person.id === Number(id))) {
    return res.status(404).end();
  }

  const person = data.find((person) => person.id === Number(id));

  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  if (!data.find((person) => person.id === Number(id))) {
    return res.status(404).end();
  }

  const index = data.findIndex((person) => person.id === Number(id));

  data.splice(index, 1);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  if (!req.body.name || !req.body.number) {
    return res
      .status(400)
      .json(
        !req.body.name
          ? { error: "name missing" }
          : { error: "number missing" },
      );
  }

  if (data.find((person) => person.name === req.body.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const person = {
    id: Math.floor(Math.random() * 1000000),
    name: req.body.name,
    number: req.body.number,
  };

  data.push(person);

  res.json(person);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
