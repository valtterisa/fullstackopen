const { generateId } = require("../utils/id");

const persons = [
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

function getAll() {
  return persons;
}

function getCount() {
  return persons.length;
}

function findById(id) {
  return persons.find((person) => person.id === id) || null;
}

function removeById(id) {
  const index = persons.findIndex((person) => person.id === id);
  if (index === -1) {
    return false;
  }
  persons.splice(index, 1);
  return true;
}

function nameExists(name) {
  return Boolean(persons.find((person) => person.name === name));
}

function createPerson(name, number) {
  const person = {
    id: generateId(),
    name,
    number,
  };
  persons.push(person);
  return person;
}

module.exports = {
  getAll,
  getCount,
  findById,
  removeById,
  nameExists,
  createPerson,
};

