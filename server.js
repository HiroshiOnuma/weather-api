"use strict";

require('dotenv').config();
const apiKey = process.env.API_KEY;
const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.use(express.static('public'));

app.get('/api/current', async (req, res) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=Tokyo,JP&appid=${apiKey}&lang=ja&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
});

app.get('/api/forecast', async (req, res) => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=35.6895&lon=139.6917&appid=${apiKey}&lang=ja&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
});

app.listen(3000, () => console.log('Listening on port 3000'));