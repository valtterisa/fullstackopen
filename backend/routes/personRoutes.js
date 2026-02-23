const express = require("express");
const personController = require("../controllers/personController");

const router = express.Router();

router.get("/info", personController.getInfo);
router.get("/api/persons", personController.getAllPersons);
router.get("/api/persons/:id", personController.getPersonById);
router.delete("/api/persons/:id", personController.deletePerson);
router.post("/api/persons", personController.createPerson);

module.exports = router;

