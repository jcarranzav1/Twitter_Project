const express = require('express');

const app = express();

app.get('/api/users', (req, res) => {
  res.status(200).json({ name: 'john' });
});

module.exports = app;
