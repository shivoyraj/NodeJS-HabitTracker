const express = require("express");
//const { getStatusByDateIdHabitId } = require("../controllers/dateController");
const router = express.Router();
const habitController = require("../controllers/habitController");

router.get("/",habitController.homePage);
router.get("/habits/currentWeekRecords",habitController.renderCurrentWeek);
router.get("/habits/previousWeekRecords",habitController.renderPreviousWeek);
router.get("/habits/nextWeekRecords",habitController.renderNextWeek);
router.get("/updateStatus/:habitId/:statusId",habitController.updateHabitStatus);

//router.get("/allHabits", habitController.getHabits);
//router.get('/date/:dateId/:habitId',getStatusByDateIdHabitId)
router.post("/habits", habitController.createHabit);
router.get("/habits/delete/:habitId", habitController.deleteHabit);

module.exports = router;
