const express = require('express');
const app = express();
const { courseNames, validScheduels } = require('./app');

app.get('/names', (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  res.send(courseNames());
});

app.get('/courses', (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  let qString = req.query.string;
  // Send the json object
  res.send(validScheduels(qString));
});

let PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
