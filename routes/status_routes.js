const express = require("express");
const router = express.Router();
const statusController = require("../controllers/statusController");

// routes for rendering currentweek calender in status page
router.get("/currentWeekRecords", statusController.renderCurrentWeek);
// routes for rendering previous week calender in status page
router.get("/previousWeekRecords", statusController.renderPreviousWeek);
// routes for rendering next week calender in status page
router.get("/nextWeekRecords", statusController.renderNextWeek);

module.exports = router;