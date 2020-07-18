const flightInput = document.getElementById("flight");
const seatsDiv = document.getElementById("seats-section");
const confirmButton = document.getElementById("confirm-button");

let selection = "";

const renderFlights = (data) => {
  const flightsIds = Object.keys(data);

  flightsIds.forEach((flight) => {
    const option = document.createElement("option");
    option.innerText = flight;
    flightInput.appendChild(option);
  });
};

const getFlights = () => {
  fetch(`/flights`)
    .then((res) => res.json())
    .then((data) => renderFlights(data));
};

getFlights();

const renderSeats = (data) => {
  seatsDiv.innerHTML = "";
  document.querySelector(".form-container").style.display = "block";
  const alpha = ["A", "B", "C", "D", "E", "F"];

  // Maybe make alpha a var based on data ?
  const rowNumber = data.length / 6;

  for (let r = 1; r <= rowNumber; r++) {
    const row = document.createElement("ol");
    row.classList.add("row");
    row.classList.add("fuselage");
    seatsDiv.appendChild(row);
    for (let s = 1; s <= alpha.length; s++) {
      const id = `${r + alpha[s - 1]}`;

      const getSeatById = (id) => {
        return data.find((seat) => seat.id === id);
      };

      const seatIsAvailable = (id) => {
        return getSeatById(id).isAvailable;
      };

      const seat = document.createElement("li");

      // Two types of seats to render
      const seatOccupied = `<li><label class="seat"><span id="${id}" class="occupied">${id}</span></label></li>`;
      const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${id}" /><span id="${id}" class="avail">${id}</span></label></li>`;

      // TODO: render the seat availability based on the data...
      if (seatIsAvailable(id) === true) {
        seat.innerHTML = seatAvailable;
      } else {
        seat.innerHTML = seatOccupied;
      }

      row.appendChild(seat);
    }
  }

  let seatMap = document.forms["seats"].elements["seat"];
  seatMap.forEach((seat) => {
    seat.onclick = () => {
      selection = seat.value;
      seatMap.forEach((x) => {
        if (x.value !== seat.value) {
          document.getElementById(x.value).classList.remove("selected");
        }
      });
      document.getElementById(seat.value).classList.add("selected");
      document.getElementById("seat-number").innerText = `(${selection})`;
      confirmButton.disabled = false;
    };
  });
};

const toggleFormContent = () => {
  const flightNumber = flightInput.options[flightInput.selectedIndex].value;
  console.log("toggleFormContent: ", flightNumber);

  if (flightNumber != 0) {
    fetch(`/flights/${flightNumber}`)
      .then((res) => res.json())
      .then((data) => {
        renderSeats(data);
      });
  }
};

const handleConfirmSeat = (event) => {
  event.preventDefault();

  let reservationId = "";

  fetch("/users", {
    method: "POST",
    body: JSON.stringify({
      givenName: document.getElementById("givenName").value,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email").value,
      seat: selection,
      flight: flightInput.value,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data1) => {
      reservationId = data1.data.id;
      window.location.assign(
        `http://localhost:8000/view-reservation?reservationId=${reservationId}`
      );
    });
};

flightInput.addEventListener("change", toggleFormContent);
