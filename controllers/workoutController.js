const Workout = require('../../models/workoutModel')
const mongoose = require('mongoose');


// get all workouts
const getWorkouts = async (req, res) => {
  const userId =req.user._id
  const workouts = await Workout.find({userId}).sort({createdAt: -1})

  res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findById(id) 

  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

// create a new workout
const createWorkout = async (req, res) => {
  const {title, load, reps} = req.body

  let emptyspace = [];
  if(!title){
    emptyspace.push('title')
  }
  if(!load){
    emptyspace.push('load')
  }
  if(!reps){
    emptyspace.push('reps')
  }
  

  // add to the database
  try { 
  const userId = req.user._id

    const workout = await Workout.create({ title, load, reps ,userId})
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error:"please fill in all the fields",emptyspace})
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndDelete({_id: id})

  if(!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
  

}

// update a workout
const updateWorkout = async (req, res) => {

}

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}



