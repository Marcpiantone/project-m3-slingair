const { flights } = require("../test-data/flightSeating");
const { reservation } = require("../test-data/reservations");

const handleSeats = (req, res) => {
  res.status(200).send("OK");
};

module.exports = { handleSeats };
