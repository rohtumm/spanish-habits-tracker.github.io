const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/habit-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Could not connect to MongoDB...', error));

//testing
app.get('/', (req, res) => {
    res.send('Habit Tracker API Running');
});

//staart server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
