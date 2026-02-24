const morgan = require("morgan");
const logger = require("./logger");

const requestLogger = morgan((tokens, req, res) => {
  const base = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    tokens["response-time"](req, res) + " ms",
  ].join(" ");

  if (req.method === "POST") {
    return `${base} ${JSON.stringify(req.body)}`;
  }

  return base;
});


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
  errorHandler
}