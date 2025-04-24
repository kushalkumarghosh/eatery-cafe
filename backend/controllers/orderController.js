const mongoose = require("mongoose");
const Order = require("../models/Order");

const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      items,
      totalAmount,
      address,
      userEmail,
      clientReferenceId,
      requestId,
    } = req.body;

    if (
      !items ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !totalAmount ||
      !address ||
      !userEmail ||
      !clientReferenceId ||
      !requestId
    ) {
      await session.abortTransaction();
      return res.status(400).json({ msg: "All fields are required" });
    }

    const recentOrder = await Order.findOne({
      clientReferenceId,
    }).session(session);

    if (recentOrder) {
      await session.abortTransaction();
      return res
        .status(409)
        .json({ msg: "Order already exists", order: recentOrder });
    }

    const order = new Order({
      userEmail,
      items,
      totalAmount,
      address,
      clientReferenceId,
    });

    const savedOrder = await order.save({ session });
    await session.commitTransaction();
    res
      .status(201)
      .json({ msg: "Order created successfully", order: savedOrder });
  } catch (err) {
    console.error("Order creation error:", err);
    await session.abortTransaction();
    res.status(500).json({ msg: "Server error" });
  } finally {
    session.endSession();
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userEmail: req.user.email });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
    await order.deleteOne();
    res.json({ msg: "Order deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { createOrder, getUserOrders, getAllOrders, deleteOrder };
