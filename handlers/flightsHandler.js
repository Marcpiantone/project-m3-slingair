const { flights } = require("../test-data/flightSeating");
const { reservation } = require("../test-data/reservations");

const handleFlight = (req, res) => {
  const id = req.params.id.toUpperCase();

  const getFlightById = (id) => {
    for (let flight in flights) {
      if (flight === id) return flights[flight];
    }
  };
  const flight = getFlightById(id);
  console.log(flight);
  if (flight !== undefined) {
    res.status(200).send(flight);
  } else {
    res.status(404).send("flight not found, 404");
  }
};

const handleFlights = (req, res) => {
  res.status(200).send(flights);
};

module.exports = { handleFlight, handleFlights };
