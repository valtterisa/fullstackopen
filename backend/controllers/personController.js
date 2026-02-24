const personModel = require("../models/personModel");

async function getInfo(req, res) {
  const count = await personModel.getCount();
  res.send("Phonebook has info for " + count + " people <br><br>" + new Date());
}

async function getAllPersons(req, res) {
  const persons = await personModel.getAll();
  res.json(persons);
}

async function getPersonById(req, res) {
  const id = Number(req.params.id);
  const person = await personModel.findById(id);
  if (!person) {
    return res.status(404).end();
  }
  res.json(person);
}

async function deletePerson(req, res) {
  const id = Number(req.params.id);
  const removed = await personModel.removeById(id);
  if (!removed) {
    return res.status(404).end();
  }
  res.status(204).end();
}

async function createPerson(req, res) {
  const { name, number } = req.body;

  if (!name || !number) {
    return res
      .status(400)
      .json(!name ? { error: "name missing" } : { error: "number missing" });
  }

  const person = await personModel.createPerson(name, number);
  res.json(person);
}

async function updateNumber(req, res) {
  const { id, number } = req.body;

  if (!id || !number) {
    return res
      .status(400)
      .json(!id ? { error: "id missing" } : { error: "number missing" });
  }

  const person = await personModel.updateNumber(id, number);
  res.json(person);
}

module.exports = {
  getInfo,
  getAllPersons,
  getPersonById,
  deletePerson,
  createPerson,
  updateNumber
};
