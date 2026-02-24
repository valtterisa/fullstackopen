const express = require("express");
const path = require("path");
const middleware = require("./utils/middleware");
const personRoutes = require("./routes/personRoutes");

const app = express();

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "..", "frontend", "dist");
  app.use(express.static(distPath));
  app.get("/{*path}", (req, res) => {
    if (req.path.startsWith("/api") || req.path === "/info") {
      return res.status(404).end();
    }
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.use(express.json());
app.use(middleware.requestLogger);

app.use(personRoutes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

