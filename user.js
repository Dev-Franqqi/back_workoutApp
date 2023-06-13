const express = require('express');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use(userRoutes);

module.exports = app;
