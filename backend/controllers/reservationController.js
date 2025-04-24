const Reservation = require("../models/Reservation");

const createReservation = async (req, res) => {
  try {
    const { name, email, phone, guests, date, time, message } = req.body;

    if (!name || !email || !phone || !guests || !date || !time) {
      return res
        .status(400)
        .json({ msg: "All fields except message are required" });
    }

    if (typeof guests !== "number" || guests <= 0) {
      return res.status(400).json({ msg: "Guests must be a positive number" });
    }

    const newReservation = new Reservation({
      user: req.user?.id,
      name,
      email,
      phone,
      guests,
      date,
      time,
      message,
    });

    const savedReservation = await newReservation.save();
    res
      .status(201)
      .json({
        msg: "Reservation created successfully",
        reservation: savedReservation,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ msg: "Reservation not found" });
    }

    await reservation.deleteOne();
    res.json({ msg: "Reservation deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { createReservation, getAllReservations, deleteReservation };
