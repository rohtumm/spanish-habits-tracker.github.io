const mongoose = require('mongoose');

//habit schema
const HabitSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    habitType: { type: String, required: true },
    date: { type: Date, default: Date.now },
    description: String
});

module.exports = mongoose.model('Habit', HabitSchema);