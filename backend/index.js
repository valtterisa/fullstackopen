const config = require("./utils/config");
const app = require("./app");
const { connectMongo } = require("./db/mongo");

connectMongo()
  .then(() => {
    app.listen(config.PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  });
