const app = require("./app");
const { connectMongo } = require("./db/mongo");

const port = Number(process.env.PORT) || 3001;

connectMongo()
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  });
