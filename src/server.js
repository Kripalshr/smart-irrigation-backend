const express = require("express");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const authenticate = require("./middleware/authMiddleware");
const sendMoistureData = require("./sensors/soilmoisture");
const sendTemperatureData = require("./sensors/temperature");
const sendHumidityData = require("./sensors/humidity");
const Data = require("./models/sensorData");
const { verifyToken } = require("./config/jwt");
const User = require("./models/User");
// const User = require('./models/User');
const { getHumidityFromApi, getTemperatureFromApi } = require("./sensors/api");

const app = express();
const PORT = process.env.PORT || 3333;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend domain
  })
);

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Protected route
app.get("/api/dashboard", authenticate, async (req, res) => {
  const tokenDecode = verifyToken(req?.headers?.authorization);
  const userInfo = await User.findById(tokenDecode?.userId);
  res.json({
    status: "success",
    data: userInfo?.fullName,
  });
});

// soil moisture
app.get("/api/moisture", (req, res) => {
  const moistureData = sendMoistureData();
  res.json(moistureData);
});

//temperature data
app.get("/api/temperature", (req, res) => {
  const temperatureData = sendTemperatureData(); // Generate random temperature value between 20 and 70
  res.json(temperatureData);
});

//humidity data
app.get("/api/humidity", (req, res) => {
  const humidityData = sendHumidityData(); // Generate random humidity value between 0 and 100
  res.json(humidityData);
});

// let data = getTemperatureFromApi()
//   .then((temp) => {
//     console.log("Temperature:", temp);
//   })
//   .catch((error) => {
//     console.error(error);
//     // Perform any error handling or display error messages
//   });

// store data in database
setInterval(async () => {
  // console.log(sendMoistureData().moisture);
  // console.log(sendTemperatureData().temperature);
  // console.log(sendHumidityData().humidity);
  try {
    const data = new Data({
      moisture: sendMoistureData().moisture,
      temperature: sendTemperatureData().temperature,
      humidity: sendHumidityData().humidity,
    });

    await data.save();
    console.log("Data saved:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}, 60000);

// Start the server
app.listen(PORT, (error) => {
  if (error) {
    console.error("Server failed to start:", error);
    return;
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
