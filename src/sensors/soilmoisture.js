const generateMoisture = () => {
    const minMoisture = 10;
    const maxMoisture = 60;
    return getRandomNumber(minMoisture, maxMoisture);
  };
  
  const updateMoisture = (previousMoisture) => {
    const minChange = -2;
    const maxChange = 2;
    const moistureChange = getRandomNumber(minChange, maxChange);
    let newMoisture = previousMoisture + moistureChange;
  
    // Ensure the moisture stays within a specific range
    const minMoisture = 10;
    const maxMoisture = 60;
    newMoisture = Math.max(minMoisture, Math.min(newMoisture, maxMoisture));
  
    return Math.round(newMoisture);
  };
  
  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  
  let moisture = generateMoisture();
  
  const sendMoistureData = () => {
    moisture = updateMoisture(moisture);
    const moistureData = { moisture };
    // Send the updated moisture data to the front-end or do any processing here
    return moistureData;
  };
  
  // Call sendMoistureData every 5 seconds
  setInterval(sendMoistureData, 5000);
  
  module.exports = sendMoistureData;
  