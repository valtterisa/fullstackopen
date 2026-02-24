const express = require("express");
const personController = require("../controllers/personController");

const router = express.Router();

router.get("/api/info", personController.getInfo);
router.get("/api/persons", personController.getAllPersons);
router.get("/api/persons/:id", personController.getPersonById);
router.delete("/api/persons/:id", personController.deletePerson);
router.post("/api/persons", personController.createPerson)
router.put("/api/persons", personController.updateNumber)

module.exports = router;
