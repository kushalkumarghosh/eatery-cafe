import React, { useState, useContext } from "react";
import { Typography, Button, Input } from "@material-tailwind/react";
import axios from "../../api/axios.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";

const Reservation = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please log in to make a reservation");
      navigate("/login");
      return;
    }

    if (!name || !email || !phone || !date || !time || !guests) {
      toast.error("Please fill out all required fields");
      return;
    }

    const guestsNum = parseInt(guests);
    if (isNaN(guestsNum) || guestsNum <= 0) {
      toast.error("Number of guests must be a positive number");
      return;
    }

    try {
      await axios.post("/reservations", {
        name,
        email,
        phone,
        date,
        time,
        guests: guestsNum,
      });
      toast.success("Reservation made successfully!");
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      setTime("");
      setGuests("");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to make reservation");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Typography variant="h3" className="mb-6 text-[#8A4B08] text-center">
        Make a Reservation
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md"
      >
        <Input
          type="text"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="tel"
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <Input
          type="date"
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <Input
          type="time"
          label="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <Input
          type="number"
          label="Number of Guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          required
          min="1"
        />
        <Button
          type="submit"
          className="w-1/3 rounded-md bg-[#FF9130] hover:bg-[#E07B00] py-2 text-white transition flex mx-auto justify-center "
        >
          Reserve
        </Button>
      </form>
    </div>
  );
};

export default Reservation;
