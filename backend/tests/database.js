import mongoose from "mongoose";

export const closeDatabase = async () => {
  if (mongoose.connection.readyState) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    console.log("Test MongoDB connection closed");
  }
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  await Promise.all(
    Object.values(collections).map((collection) => collection.deleteMany({})),
  );
  console.log("Test MongoDB collections cleared");
};
