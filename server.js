"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { flights } = require("./test-data/flightSeating");
const { handleSeats } = require("./handlers/seatsHandler");
const {
  handleFlightLocal,
  handleFlightsLocal,
  handleFlightsAPI,
  handleFlightAPI,
} = require("./handlers/flightsHandler");
const {
  handleConfirmSeat,
  handleReservations,
  handleReservation,
  handleConfirmation,
  handleUserReservations,
} = require("./handlers/userHandler");

const PORT = process.env.PORT || 8000;

const handle404 = (req, res) => {
  res.status(404).send("Nothing to see here, 404");
};

const handleHomepage = (req, res) => {
  res.status(200).send("Welcome !");
};

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("dev"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints

  .get("/", handleHomepage)

  .get("/seat-select", handleSeats)

  .post("/users", handleConfirmSeat)
  .get("/users", handleReservations)
  .get("/users/:id", handleReservation)

  .get("/view-reservations", handleConfirmation)
  .get("/view-reservations/:email", handleUserReservations)

  .get("/flights/:id", handleFlightAPI)
  .get("/flights", handleFlightsAPI)

  .get("*", handle404)

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
