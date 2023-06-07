const generateTemperature = () => {
  const minTemperature = 15;
  const maxTemperature = 35;
  return getRandomNumber(minTemperature, maxTemperature);
};

const updateTemperature = (previousTemperature) => {
  const minChange = -1;
  const maxChange = 1;
  const temperatureChange = getRandomNumber(minChange, maxChange);
  let newTemperature = previousTemperature + temperatureChange;

  // Ensure the temperature stays within a specific range
  const minTemperature = 15;
  const maxTemperature = 35;
  newTemperature = Math.max(
    minTemperature,
    Math.min(newTemperature, maxTemperature)
  );

  return Math.round(newTemperature); // Convert temperature to an integer
};

const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

let temperature = generateTemperature(); // Initialize temperature with generated value

const sendTemperatureData = () => {
  temperature = updateTemperature(temperature);
  const temperatureData = { temperature };
  // Send the updated temperature data to the front-end or do any processing here
  return temperatureData;
};

// Call sendTemperatureData every 5 seconds
setInterval(sendTemperatureData, 5000);

module.exports = sendTemperatureData;
