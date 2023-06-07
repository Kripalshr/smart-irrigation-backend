const generateHumidity = () => {
    const minHumidity = 40;
    const maxHumidity = 80;
    return getRandomNumber(minHumidity, maxHumidity);
  };
  
  const updateHumidity = (previousHumidity) => {
    const minChange = -2;
    const maxChange = 2;
    const humidityChange = getRandomNumber(minChange, maxChange);
    let newHumidity = previousHumidity + humidityChange;
  
    // Ensure the humidity stays within a specific range
    const minHumidity = 40;
    const maxHumidity = 60;
    newHumidity = Math.max(minHumidity, Math.min(newHumidity, maxHumidity));
  
    return Math.round(newHumidity); // Convert humidity to an integer
  };
  
  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  
  let humidity = generateHumidity(); // Initialize humidity with generated value
  
  const sendHumidityData = () => {
    humidity = updateHumidity(humidity);
    const humidityData = { humidity };
    // Send the updated humidity data to the front-end or do any processing here
    return humidityData;
  };
  
  // Call sendHumidityData every 5 seconds
    setInterval(sendHumidityData, 5000);
  
  module.exports = sendHumidityData;
  