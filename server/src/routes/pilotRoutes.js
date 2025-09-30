const {FillPilotInfo} = require("../controller/PilotController/info");
const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

router.post("/fillPilotInfo", protect,authorizeRoles("pilot") ,FillPilotInfo);

module.exports = router;