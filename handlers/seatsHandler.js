const { flights } = require("../test-data/flightSeating");
const { reservations } = require("../test-data/reservations");
const { v4: uuidv4 } = require("uuid");

const handleSeats = (req, res) => {
  res.status(200).send("OK");
};

module.exports = { handleSeats };
