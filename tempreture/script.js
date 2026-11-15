
const temperature = document.getElementById("temperature");
const unit = document.getElementById("unit");
const convertBtn = document.getElementById("convertBtn");

const error = document.getElementById("error");
const results = document.getElementById("results");

const celsius = document.getElementById("celsius");
const fahrenheit = document.getElementById("fahrenheit");
const kelvin = document.getElementById("kelvin");

// Format output to 2 decimal places
function formatValue(value) {
    return Number(value.toFixed(2));
}

// Convert temperature
function convertTemperature() {

    const input = temperature.value.trim();
    const value = Number(input);
    const selectedUnit = unit.value;

    // Reset previous error
    error.textContent = "";
    results.style.display = "none";

    // Check empty input
    if (input === "") {
        error.textContent = "Please enter a temperature value.";
        return;
    }

    // Check numeric input
    if (!Number.isFinite(value)) {
        error.textContent = "Invalid input! Please enter a valid number.";
        return;
    }

    let c;

    // Convert input into Celsius
    if (selectedUnit === "C") {
        c = value;
    }

    else if (selectedUnit === "F") {
        c = (value - 32) * 5 / 9;
    }

    else if (selectedUnit === "K") {
        c = value - 273.15;
    }

    // Absolute zero validation
    if (c < -273.15) {
        error.textContent =
            "Temperature cannot be below absolute zero (-273.15°C).";
        return;
    }

    // Calculate all three units
    const f = (c * 9 / 5) + 32;
    const k = c + 273.15;

    // Display results
    celsius.textContent = formatValue(c) + " °C";
    fahrenheit.textContent = formatValue(f) + " °F";
    kelvin.textContent = formatValue(k) + " K";

    results.style.display = "block";
}

// Button click
convertBtn.addEventListener("click", convertTemperature);

// Real-time input validation
temperature.addEventListener("input", () => {

    error.textContent = "";
    results.style.display = "none";

    const input = temperature.value.trim();

    if (input !== "" && !Number.isFinite(Number(input))) {
        error.textContent = "Please enter numbers only.";
    }
});

// Allow Enter key to convert
temperature.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        convertTemperature();
    }
});

// Hide previous result when unit changes
unit.addEventListener("change", () => {
    results.style.display = "none";
    error.textContent = "";
});
