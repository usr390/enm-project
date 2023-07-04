import cors from "cors";
import express, { Request, Response } from "express";
import mongoose from "mongoose";

import EnmEventModel from "./models/EnmEvent";

const app = express(); app.use(cors({ origin: '*' })); app.use(express.json())
const port = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
  res.send('enm-api')
})

app.get('/api/enmEvents', async (req: Request, res: Response) => {

  // create and adjust to the start of the UTC day
  let currentDate = new Date().setUTCHours(0, 0, 0, 0);
  
  // return all future EnmEvent objects (including today's)
  res.json(await EnmEventModel.find({ time: { $gte: currentDate } })
  .sort({ time: 1 })
  .catch(err => console.log(err)))
})

app.get('/api/enmEventsPendingDeletion', async (req: Request, res: Response) => {

  // get current date parts
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth() + 1; // adjust for 0-based index in JS
  let currentDay = currentDate.getDate();

  // return all future EnmEvent objects
  res.json(await EnmEventModel.find({
    $or: [
      { year: { $gt: currentYear } },
      { year: currentYear, month: { $gt: currentMonth } },
      { year: currentYear, month: currentMonth, day: { $gte: currentDay } }
    ]
  })
  .sort({ year: 1, month: 1, day: 1, startTime: 1})
  .catch(err => console.log(err)))
})

app.post('/api/enmEvent', async (req: Request, res: Response) => {
  const enmEvent = new EnmEventModel({
    id: req.body.id,
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    time: req.body.time,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    priceOfEntry: req.body.priceOfEntry,
  });
  // persist and respond to client with created EnmEvent object
  res.json(await enmEvent.save());
})

app.post('/api/enmEventTest', async (req: Request, res: Response) => {
  /* summary
    using this API point to slowly build up ENM-3 (feature allowing users to add their own events to the website).
  */
  const enmEvent = new EnmEventModel({
    name: "",
    location: req.body.location,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: "USA",
    time: req.body.time,
    day: req.body.day, 
    month: req.body.month, 
    year: req.body.year,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    priceOfEntry: req.body.priceOfEntry,
    artists: req.body.artists
  });
  // persist and respond to client with created EnmEvent object
  res.json(await enmEvent.save());
})

// asynchronous initialization. keeps api from processesing requests until a successful connection to db is established
mongoose.connect(process.env.MONGO_URL || '').then(() => { app.listen(port, () => {}); })
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
  process.exit(1); // exit the process with an error code
});

