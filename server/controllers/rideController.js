import Ride from "../models/Ride.js";

export const createRide = async (req, res) => {
  try {
    const { from, to, date, time, availableSeats, price } = req.body;

    if (!from || !to || !date || !time || !availableSeats || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (availableSeats <= 0 || price <= 0) {
      return res.status(400).json({ message: "Invalid seats or price" });
    }

    const ride = await Ride.create({
      driver: req.user._id || req.user.id,
      from,
      to,
      date,
      time,
      availableSeats,
      price,
    });

    res.status(201).json(ride);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const searchRides = async (req, res) => {
  try {
    const { from, to, date } = req.query;

    const query = {
      status: "active",
      availableSeats: { $gt: 0 },
    };

    if (from) query.from = new RegExp(from, "i");
    if (to) query.to = new RegExp(to, "i");

    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      query.date = { $gte: start, $lte: end };
    }

    const rides = await Ride.find(query)
      .populate("driver", "name email")
      .sort({ date: 1 });

    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getRideById = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id)
      .populate("driver", "name email")
      .populate("passengers", "name email");

    if (!ride) return res.status(404).json({ message: "Ride not found" });

    res.json(ride);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
