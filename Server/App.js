const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://0.0.0.0:27017/counter_db')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define counter schema and model
const counterSchema = new mongoose.Schema({
    count: { type: Number, default: 0 },
    myCount: { type: Number, default: 0 } // new field for myCount
}, { collection: 'counters' });
const Counter = mongoose.model('Counter', counterSchema);

// Routes
app.get('/api/counter', async (req, res) => {
    try {
        const counter = await Counter.findOne();
        if (!counter) {
            const newCounter = new Counter();
            await newCounter.save();
            res.json(newCounter);
        } else {
            res.json(counter);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/counter/increment', async (req, res) => {
    try {
        let counter = await Counter.findOne();
        if (!counter) {
            counter = new Counter();
        }
        counter.count++;
        await counter.save();
        res.json(counter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/counter/decrement', async (req, res) => {
    try {
        let counter = await Counter.findOne();
        if (!counter) {
            counter = new Counter();
        }
        counter.count--;
        await counter.save();
        res.json(counter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// New endpoints for managing myCount
app.post('/api/counter/incrementMyCount', async (req, res) => {
    try {
      let counter = await Counter.findOne();
      if (!counter) {
        counter = new Counter();
      }
      counter.myCount++; // ensure myCount field is incremented
      await counter.save();
      res.json(counter);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  app.post('/api/counter/decrementMyCount', async (req, res) => {
    try {
      let counter = await Counter.findOne();
      if (!counter) {
        counter = new Counter();
      }
      counter.myCount--; // ensure myCount field is decremented
      await counter.save();
      console.log(counter);
      res.json(counter);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
