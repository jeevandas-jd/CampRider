

const {getAllUsers,getUserById,removeUserById} = require("../controller/adminController/adminController");

const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

const router = express.Router();



// Admin routes
router.get("/users", protect, authorizeRoles("admin"), getAllUsers);
router.get("/users/:id", protect, authorizeRoles("admin"), getUserById);
router.delete("/users/:id", protect, authorizeRoles("admin"), removeUserById);

module.exports = router;