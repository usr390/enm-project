import cors from "cors";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { DateTime } from "luxon";

import EnmEventModel from "./models/EnmEvent";
import VenueModel from "./models/Venue";

const app = express(); app.use(cors({ origin: '*' })); app.use(express.json())
const port = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
  res.send('enm-api')
})

app.get('/api/enmEvents', async (req: Request, res: Response) => {

  // dt is -12 hours because it is still desirable to get EnmEvents when their dateTime has passed by only a few hours.
  // for example, users searching for events at 9pm would probably be interested in seeing which events started at 8pm or earlier
  let dt = DateTime.now().minus({ hours: 12 })
  
  // return all future EnmEvent objects (including today's)
  res.json(await EnmEventModel.find({ dateTime: { $gte: dt } })
  .sort({ dateTime: 1 })
  .catch(err => console.log(err)))
})

app.get('/api/venues', async (req: Request, res: Response) => {
  res.json(await VenueModel.find()
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
    dateTime: req.body.dateTime,
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
    dateTime: req.body.dateTime,
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

