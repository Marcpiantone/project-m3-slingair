const { flights } = require("../test-data/flightSeating");
const { reservation } = require("../test-data/reservations");
const baseUrl = "https://journeyedu.herokuapp.com/slingair";
const request = require("request-promise");

const handleFlightLocal = (req, res) => {
  const id = req.params.id.toUpperCase();

  const getFlightById = (id) => {
    return flights[id];
  };

  const flight = getFlightById(id);

  if (flight !== undefined) {
    res.status(200).send(flight);
  } else {
    res.status(404).send("flight not found, 404");
  }
};

const handleFlightsLocal = (req, res) => {
  res.status(200).send(flights);
};

const handleFlightsAPI = (req, res) => {
  const getFlights = async () => {
    try {
      const res = await request(`${baseUrl}/flights`);
      return JSON.parse(res);
    } catch (err) {
      console.log(err);
    }
  };
  getFlights().then((data) => console.log(data));

  getFlights().then((data) => res.status(200).send(data.flights));
};

const handleFlightAPI = (req, res) => {
  const flight = req.params.id;
  const getFlight = async () => {
    try {
      const res = await request(`${baseUrl}/flights/${flight}`);
      return JSON.parse(res);
    } catch (err) {
      console.log(err);
    }
  };
  getFlight(flight).then((data) => console.log(data[flight]));

  getFlight(flight).then((data) => res.status(200).send(data[flight]));
};

module.exports = {
  handleFlightLocal,
  handleFlightsLocal,
  handleFlightsAPI,
  handleFlightAPI,
};
