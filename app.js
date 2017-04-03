'use strict';

const express = require('express');
const rateLimiting = require('./middlewares/rate-limiting');
const config = require('./config.json')[process.env.NODE_ENV || 'local'];
const app = express();

const { port } = config.node;

// Apply middleware
app.use(rateLimiting);

app.get('/', (req, res) => {
    res.send('OK');
});

app.listen(port, (req, res) => {
    console.log(`Server listening on ${port}`);
});