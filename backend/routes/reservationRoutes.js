const express = require("express");
const router = express.Router();

const {
  createReservation,
  getAllReservations,
  deleteReservation,
} = require("../controllers/reservationController");
const { protect, admin } = require("../middlewares/authMiddleware");

router.post("/", protect, createReservation);
router.get("/", protect, admin, getAllReservations);
router.delete("/:id", protect, admin, deleteReservation);

module.exports = router;
