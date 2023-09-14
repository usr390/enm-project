import cors from "cors";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { DateTime } from "luxon";

import EnmEventModel from "./models/EnmEvent";
import VenueModel from "./models/Venue";
import UserModel from "./models/User";

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

app.post('/api/login', async (req: Request, res: Response) => {

  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ error: 'Username and password are required.' });

  try {
    const user = await UserModel.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials.' });
    if (user.password !== password) return res.status(401).json({ error: 'Invalid credentials.' });
    res.json({ user });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/api/enmEventTest', async (req: Request, res: Response) => {
  /* summary
    using this API point to slowly build up ENM-3 (feature allowing users to add their own events to the website).
  */
  const enmEvent = new EnmEventModel({
    tags: req.body.tags,
    venue: req.body.venue,
    dateTime: req.body.dateTime,
    priceOfEntry: req.body.priceOfEntry,
    artists: req.body.artists
  });
  // persist and respond to client with created EnmEvent object
  res.json(await enmEvent.save());
})

app.post('/api/venue', async (req: Request, res: Response) => {
  /* summary
    used to post new venues. for now, defaulting 'state' and 'country' to hard coded values
  */
  const venue = new VenueModel({
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    state: "Texas",
    country: "USA",
  });
  // persist and respond to client with created EnmEvent object
  res.json(await venue.save());
})

// asynchronous initialization. keeps api from processesing requests until a successful connection to db is established
mongoose.connect(process.env.MONGO_URL || '').then(() => { app.listen(port, () => {}); })
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
  process.exit(1); // exit the process with an error code
});

