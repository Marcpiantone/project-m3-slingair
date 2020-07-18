const { reservations } = require("../test-data/reservations");
const { v4: uuidv4 } = require("uuid");

const handleConfirmSeat = (req, res) => {
  const givenName = req.body.givenName;
  const surname = req.body.surname;
  const email = req.body.email;
  const seat = req.body.seat;
  const flight = req.body.flight;

  const newReservation = {
    id: uuidv4(),
    flight,
    seat,
    givenName,
    surname,
    email,
  };

  reservations.push(newReservation);

  res.status(201).json({
    status: "201",
    message: "New reservation successfully created",
    data: newReservation,
  });
};

const handleReservations = (req, res) => {
  res.status(200).json({ reservations });
};

const handleUserInfo = (req, res) => {
  const reservationId = req.params.id;

  const getReservationById = (id) => {
    return reservations.find((reservation) => reservation.id === id);
  };

  if (getReservationById(reservationId)) {
    res.status(200).json(getReservationById(reservationId));
  } else {
    res.status(404).json({ message: "Reservation not found, 404 " });
  }
};

const handleConfirmation = (req, res) => {
  const reservationId = req.query.reservationId;

  const getReservationById = (id) => {
    const reservation = reservations.find((reservation) => {
      return reservation.id === id;
    });
    return reservation;
  };

  const reservation = getReservationById(reservationId);
  if (reservation !== undefined) {
    res.status(200).render("./pages/view-reservation.ejs", { reservation });
  } else {
    res.status(404).send("Reservation not found, 404");
  }
};

module.exports = {
  handleConfirmSeat,
  handleReservations,
  handleUserInfo,
  handleConfirmation,
};
