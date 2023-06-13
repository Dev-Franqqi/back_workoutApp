const express = require('express');
const workoutRoutes = require('./routes/workouts');

const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use(workoutRoutes);

module.exports = app;
