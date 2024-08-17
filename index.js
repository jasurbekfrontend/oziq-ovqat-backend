const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require("dotenv").config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/api", require("./routes/routes.js"))

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));