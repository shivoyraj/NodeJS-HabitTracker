const express = require("express");
const router = express.Router();
const statusController = require("../controllers/statusController");

router.get("/currentWeekRecords", statusController.renderCurrentWeek);
router.get("/previousWeekRecords", statusController.renderPreviousWeek);
router.get("/nextWeekRecords", statusController.renderNextWeek);

module.exports = router;