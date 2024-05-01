
import express from "express";
import cors from "cors";
import mongoose from "mongoose";


const app = express();

// Resolve CORS
app.use(
  cors({
    // origin: [config.clientUrl],
    origin: true,
    credentials: true,
  })
);



// MongoDB Connection
mongoose
  .connect("mongodb://0.0.0.0:27017/counter_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define counter schema and model
const counterSchema = new mongoose.Schema(
  {
    count: { type: Number, default: 0 },
    myCount: { type: Number, default: 0 },
  },
  { collection: "counters" }
);

const Counter = mongoose.model("Counter", counterSchema);

// Routes
// Routes
app.get("/api/counters", async (req, res) => {
  try {
    const document = await Counter.findOne();
    const counter = document ? document.count : 0;
    const myCounter = document ? document.myCount : 0;
    res.json({ counter, myCounter });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/api/counter/increment", async (req, res) => {
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
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/api/counter/decrement", async (req, res) => {
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
    res.status(500).json({ message: "Server Error" });
  }
});

// app.get("/api/mycounter", async (req, res) => {
//   try {
//     const counter = await Counter.findOne();
//     res.json(counter);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

app.post("/api/mycounter/increment", async (req, res) => {
  try {
    let counter = await Counter.findOne();
    if (!counter) {
      counter = new Counter();
    }
    counter.myCount++;
    await counter.save();
    res.json(counter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/api/mycounter/decrement", async (req, res) => {
  try {
    let counter = await Counter.findOne();
    if (!counter) {
      counter = new Counter();
    }
    counter.myCount--;
    await counter.save();
    res.json(counter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));