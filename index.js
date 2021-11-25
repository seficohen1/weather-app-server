require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const app = express();
const port = 3000;

const weather = require('./weather');

app.use(express.json());

const whiteList = [
  'http://127.0.0.1',
  'http://127.0.0.1:5500',
  'https://weather-app-server-oboi1zvv9-seficohen1.vercel.app/',
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('NOT ALLOWED BY CORS'));
    }
  },
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
});

app.use(limiter);

//test route

app.get('/', (req, res) => {
  res.json({ success: 'Success!' });
});

app.use('/weather', weather);
app.listen(port, () => console.log(`App listening on port ${port}`));
