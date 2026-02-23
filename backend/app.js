const express = require("express");
const path = require("path");
const morgan = require("morgan");
const personRoutes = require("./routes/personRoutes");

const app = express();

app.use(express.json());

morgan.token("body", (req) => JSON.stringify(req.body));

app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :body", {
    skip: (req) => req.method !== "POST",
  }),
);

app.use(morgan(":method :url :status :res[content-length] :response-time ms"));

app.use(personRoutes);

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

module.exports = app;

