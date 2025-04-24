const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  deleteOrder,
} = require("../controllers/orderController");
const { protect, admin } = require("../middlewares/authMiddleware");

router.post("/", protect, createOrder);
router.get("/user", protect, getUserOrders);
router.get("/", protect, admin, getAllOrders);
router.delete("/:id", protect, admin, deleteOrder);

module.exports = router;
