const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {
  errorHandler,
  logErrors,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// app.use(cors());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  },
};
app.use(cors());

app.get('/api', (req, res) => {
  res.send('Hello Word, Server from Express');
});

app.post('/api', function (req, res) {
  res.send('POST request to the homepage');
});

app.get('/api/new-route', (req, res) => {
  res.send('New Route');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('My port' + port);
});
