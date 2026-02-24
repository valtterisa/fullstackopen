import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod;

export const connect = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
  console.log("Test MongoDB connected");
  await seedPersons();
};

export const closeDatabase = async () => {
  if (mongoose.connection.readyState) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod?.stop();
    console.log("Test MongoDB connection closed");
  }
};

export const clearDatabase = async () => {
  await seedPersons();
};

async function seedPersons() {
  const Person = mongoose.models.Person;
  if (!Person) return;

  await Person.deleteMany({});
  await Person.insertMany([
    { id: 1, name: "Valtteri Savonen", number: "111-111" },
    { id: 2, name: "Chuck Norris", number: "222-222" },
  ]);
  console.log("Test MongoDB seeded with default persons");
}
