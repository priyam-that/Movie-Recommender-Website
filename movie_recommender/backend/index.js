
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

// Creates an Express application instance
const app = express();

// Parses incoming JSON and URL-encoded payloads
app.use(express.json({ limit: '5mb' })); // Increase payload size limit upto 5 mb
app.use(express.urlencoded({ limit: '5mb', extended: true }));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,   // ensures that cookies are included in cross-origin requests
}));
app.use(cookieParser()); // to Parse cookies in requests

app.use("/api", router);  // Registers all routes defined in the router file


const PORT = 7070 || process.env.PORT;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port", PORT);
    });
});

