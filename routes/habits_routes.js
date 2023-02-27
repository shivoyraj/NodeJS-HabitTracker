const express = require("express");
const router = express.Router();
const habitController = require("../controllers/habitController");

// routes http get request for update status
router.get("/updateStatus/:habitId/:statusId", habitController.updateHabitStatus);
// routes http post request for add new habit
router.post("/createHabit", habitController.createHabit);
// routes http delete request for removing existing habit
router.get("/delete/:habitId", habitController.deleteHabit);

module.exports = router;