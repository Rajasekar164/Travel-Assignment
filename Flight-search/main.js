import flights from "./flights.js";

// 1. Filter flights by maximum price and stops
function filterFlights(maxPrice, maxStops) {
    return flights.filter(flight =>
        flight.price <= maxPrice &&
        flight.stops <= maxStops
    );
}

// Test
console.log("Filtered Flights:");
console.log(filterFlights(5000, 0));

import flights from "./flights.js";

// 1. Filter flights by maximum price and stops
function filterFlights(maxPrice, maxStops) {
    return flights.filter(flight =>
        flight.price <= maxPrice &&
        flight.stops <= maxStops
    );
}

// Test
console.log("Filtered Flights:");
console.log(filterFlights(5000, 0));

// 2. Sort flights by price
function sortByPrice() {
    return [...flights].sort((a, b) => a.price - b.price);
}

// 3. Sort flights by departure time
function sortByDeparture() {
    return [...flights].sort((a, b) =>
        a.departure.localeCompare(b.departure)
    );
}

console.log("Sorted by Price:");
console.log(sortByPrice());

console.log("Sorted by Departure:");
console.log(sortByDeparture());

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

console.log("Cheapest Flight Per Airline:");
console.log(cheapestPerAirline());