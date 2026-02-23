const personModel = require("../models/personModel");

function getInfo(req, res) {
  const count = personModel.getCount();
  res.send(
    "Phonebook has info for " + count + " people <br><br>" + new Date(),
  );
}

function getAllPersons(req, res) {
  const persons = personModel.getAll();
  res.json(persons);
}

function getPersonById(req, res) {
  const id = Number(req.params.id);
  const person = personModel.findById(id);
  if (!person) {
    return res.status(404).end();
  }
  res.json(person);
}

function deletePerson(req, res) {
  const id = Number(req.params.id);
  const removed = personModel.removeById(id);
  if (!removed) {
    return res.status(404).end();
  }
  res.status(204).end();
}

function createPerson(req, res) {
  const { name, number } = req.body;

  if (!name || !number) {
    return res
      .status(400)
      .json(!name ? { error: "name missing" } : { error: "number missing" });
  }

  if (personModel.nameExists(name)) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const person = personModel.createPerson(name, number);
  res.json(person);
}

module.exports = {
  getInfo,
  getAllPersons,
  getPersonById,
  deletePerson,
  createPerson,
};

