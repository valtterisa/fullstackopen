const config = require("./utils/config");
const app = require("./app");

app.listen(config.PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${config.PORT}`);
});
