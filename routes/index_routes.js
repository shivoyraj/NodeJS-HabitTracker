const express = require("express");
const router = express.Router();
const habitController = require("../controllers/habitController");

router.get("/",habitController.homePage);
router.get("/habit/new",habitController.AddHabitPage);

router.get("/habits", habitController.getHabits);
router.post("/habits", habitController.createHabit);
router.put("/habits", habitController.updateHabit);
router.delete("/habits", habitController.deleteHabit);

module.exports = router;
