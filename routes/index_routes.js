const express = require("express");
const router = express.Router();

const habitRoutes = require("./habits_routes");
const statusRoutes = require("./status_routes");
const habitController = require("../controllers/habitController");

router.get("/",habitController.homePage);
router.use("/habits", habitRoutes);
router.use("/status", statusRoutes);

module.exports = router;