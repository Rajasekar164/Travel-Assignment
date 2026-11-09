
import flights from "./flights.js";

const flightList = document.getElementById("flightList");
const flightCount = document.getElementById("flightCount");

// 1. Filter flights
function filterFlights(maxPrice, maxStops, airlines) {
    return flights.filter(flight =>
        flight.price <= maxPrice &&
        flight.stops <= maxStops &&
        airlines.has(flight.airline)
    );
}

// 2. Sort by price
function sortByPrice(data) {
    return [...data].sort((a, b) => a.price - b.price);
}

// 3. Sort by departure
function sortByDeparture(data) {
    return [...data].sort((a, b) =>
        a.departure.localeCompare(b.departure)
    );
}

// 4. Cheapest flight per airline
function cheapestPerAirline() {
    return flights.reduce((result, flight) => {
        if (
            !result[flight.airline] ||
            flight.price < result[flight.airline].price
        ) {
            result[flight.airline] = flight;
        }

        return result;
    }, {});
}

// Display flight cards
function displayFlights(data) {
    flightList.innerHTML = "";

    flightCount.textContent =
        `${data.length} flights found`;

    if (data.length === 0) {
        flightList.innerHTML =
            `<p class="text-danger">No flights found. Try changing filters.</p>`;
        return;
    }

    data.forEach(flight => {
        const card = document.createElement("div");

        card.className = "col-12";

        card.innerHTML = `
            <div class="card flight-card p-3">
                <h5>${flight.airline}</h5>
                <p>Flight ID: ${flight.id}</p>
                <p>Departure: ${flight.departure}</p>
                <p>${flight.stops === 0 ? "Non-stop" : flight.stops + " Stop"}</p>
                <h5>₹${flight.price.toLocaleString("en-IN")}</h5>
                <button class="btn brand-button" data-book="${flight.id}">
                    Book Flight
                </button>
            </div>
        `;

        flightList.appendChild(card);
    });
}

// Apply filters and sorting
function applyFilters() {
    const maxPrice = Number(
        document.querySelector("[data-price]").value
    );

    const maxStops = Number(
        document.querySelector("[data-stops]").value
    );

    const airlines = new Set(
        [...document.querySelectorAll("[data-airline]:checked")]
            .map(input => input.dataset.airline)
    );

    let result = filterFlights(maxPrice, maxStops, airlines);

    const sortOption =
        document.querySelector("[data-sort]").value;

    if (sortOption === "price") {
        result = sortByPrice(result);
    } else if (sortOption === "departure") {
        result = sortByDeparture(result);
    }

    displayFlights(result);
}

// Synchronize desktop and mobile controls
document.querySelectorAll("[data-price]").forEach(input => {
    input.addEventListener("input", () => {
        document.querySelectorAll("[data-price]").forEach(item => {
            item.value = input.value;
        });

        document.querySelectorAll("[data-price-output]").forEach(item => {
            item.textContent = input.value;
        });

        applyFilters();
    });
});

document.querySelectorAll("[data-stops]").forEach(input => {
    input.addEventListener("change", () => {
        document.querySelectorAll("[data-stops]").forEach(item => {
            item.value = input.value;
        });

        applyFilters();
    });
});

document.querySelectorAll("[data-airline]").forEach(input => {
    input.addEventListener("change", () => {
        document.querySelectorAll(
            `[data-airline="${input.dataset.airline}"]`
        ).forEach(item => {
            item.checked = input.checked;
        });

        applyFilters();
    });
});

document.querySelector("[data-sort]")
    .addEventListener("change", applyFilters);

// Book button demo
flightList.addEventListener("click", event => {
    const button = event.target.closest("[data-book]");

    if (button) {
        alert("You selected Flight ID: " + button.dataset.book);
    }
});

// Initial display
displayFlights(flights);

// Initial test
console.log("Cheapest Flight Per Airline:", cheapestPerAirline());
