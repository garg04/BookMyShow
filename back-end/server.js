const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');

require('dotenv').config();

app.use(express.json());
const mongoose = require('./config/dbConfig');
const userModel = require('./models/userModel');
const userRoute = require('./routes/userRoute');

app.use(cors());
app.use("/", userRoute);

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});