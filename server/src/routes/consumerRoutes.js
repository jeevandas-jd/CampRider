const {fillInfo}=require("../controller/passengerController/info")

const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");


router.post("/fillInfo", protect,authorizeRoles("consumer") ,fillInfo);

module.exports = router;