const { generateId } = require("../utils/id");
const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

async function getAll() {
  return await Person.find({}).then((persons) => {
    return persons;
  });
}

async function getCount() {
  return await Person.countDocuments({});
}

async function findById(id) {
  return await Person.findById(id);
}

async function removeById(id) {
  await Person.deleteOne({ id: id })
    .then(() => {
      return true;
    })
    .catch((error) => {
      return error;
    });
}

async function nameExists(name) {
  return await Person.findOne({ name: name });
}

async function createPerson(name, number) {
  if (await nameExists(name)) {
    console.log("Name already exists:", name);
    return { error: "name must be unique" };
  }

  const person = new Person({
    id: generateId(),
    name: name,
    number: number,
  });

  await person
    .save()
    .then(() => {
      console.log("Person saved to MongoDB:", person);
    })
    .catch((error) => {
      console.error("Error saving person to MongoDB:", error);
    });

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
