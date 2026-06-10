const express = require('express');
const cors = require('cors');
const mediaRouter = require("./routes/mediaRoutes");
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares Globais
app.use(cors());
app.use(express.json());

app.use('/api/media', mediaRouter);
app.use(errorHandler);

module.exports = app;
