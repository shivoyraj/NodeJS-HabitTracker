const express = require("express");
const router = express.Router();
const habitController = require("../controllers/habitController");

router.get("/updateStatus/:habitId/:statusId", habitController.updateHabitStatus);
router.post("/createHabit", habitController.createHabit);
router.get("/delete/:habitId", habitController.deleteHabit);

module.exports = router;