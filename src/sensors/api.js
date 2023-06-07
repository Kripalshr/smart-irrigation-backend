const axios = require("axios");

// async function getTemperatureAndHumidity() {
//     try {
//       const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=27.700769&lon=85.300140&appid=9e7681eeafe9cbbaa8c6fcc05f322f2c');

//       // Extract temperature and humidity data from the response
//       const { temp, humidity } = response.data.main;

//       // Process the data or return it
//       return { temp, humidity };
//     } catch (error) {
//       console.error('Error calling API:', error);
//       throw new Error('Failed to retrieve temperature and humidity data');
//     }
//   }

const getTemperatureFromApi = async () => {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=27.700769&lon=85.300140&appid=9e7681eeafe9cbbaa8c6fcc05f322f2c"
    );

    let { temp } = response.data.main;
    // Convert temperature from Kelvin to Celsius
    temp = temp - 273.15;

    return Math.round(temp);
  } catch (error) {
    console.error("Error calling API:", error);
    throw new Error("Failed to retrieve temperature data");
  }
};

const getHumidityFromApi = async () => {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=27.700769&lon=85.300140&appid=9e7681eeafe9cbbaa8c6fcc05f322f2c"
    );

    const { humidity } = response.data.main;
    return humidity;
  } catch (error) {
    console.error("Error calling API:", error);
    throw new Error("Failed to retrieve humidity data");
  }
};

module.exports = { getTemperatureFromApi, getHumidityFromApi };
