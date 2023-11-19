//  3rd party imports
import cors from "cors";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { DateTime } from "luxon";
const bcrypt = require('bcrypt');
const saltRounds = 10;

// enm imports
import EnmEventModel from "./models/EnmEvent";
import VenueModel from "./models/Venue";
import UserModel from "./models/User";
import { UserDTO } from "./models/UserDTO";

const app = express(); app.use(cors({ origin: '*' })); app.use(express.json())
const port = process.env.PORT || 3000
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

app.get('/', (req: Request, res: Response) => {
  res.send('enm-api')
})

app.get('/api/enmEvents', async (req: Request, res: Response) => {
  /* summary
    dt is -12 hours because it is still desirable to get EnmEvents when their dateTime has passed by only a few hours.
    for example, users searching for events at 9pm would probably be interested in seeing which events started at 8pm or earlier
  */
  res.json(await EnmEventModel.find({ dateTime: { $gte: DateTime.now().minus({ hours: 12 }) } })
  .sort({ dateTime: 1 })
  .catch(err => console.log(err)))
})

app.get('/api/enmEventsRegular', async (req: Request, res: Response) => {
  try {
    const today = DateTime.now().minus({ hours: 12 })
    const endOfWeek = DateTime.now().endOf('week').plus({ hours: 5 })
    const enmEvents = await EnmEventModel.find({ 
      dateTime: { $gte: today, $lte: endOfWeek } 
    }).sort({ dateTime: 1 });
    
    res.json(enmEvents);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/enmEvent', async (req: Request, res: Response) => {
  const enmEvent = new EnmEventModel({
    tags: req.body.tags,
    venue: req.body.venue,
    dateTime: req.body.dateTime,
    cover: req.body.cover,
    artists: req.body.artists,
    creationDateTime: DateTime.now()
  });
  // persist and respond to client with created EnmEvent object
  res.json(await enmEvent.save());
})

app.get('/api/venues', async (req: Request, res: Response) => {
  res.json(await VenueModel.find().catch(err => console.log(err)))
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
    link: "pending"
  });
  // persist and respond to client with created EnmEvent object
  res.json(await venue.save());
})

app.post('/api/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // The passwords match, proceed with login
    const userDTO = new UserDTO(user.id, user.username, user.plus);
    res.json({ user: { ...userDTO } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/create-user', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' }); // 409 Conflict
    }

    // Hashing the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user document and save to the database
    const newUser = new UserModel({
      username,
      password: hashedPassword, // Store the hashed password
      plus: false
    });

    await newUser.save();

    const userDTO = new UserDTO(newUser.id, newUser.username, newUser.plus);

    res.status(201).json({ user: { ...userDTO } });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'ENM Plus - Monthly Subscription',
        },
        unit_amount: 299,
      },
      quantity: 1,
    }],
    mode: 'payment',
    ui_mode: 'embedded',
    return_url: 'https://enm-project.vercel.app/checkout/return'
  });

  res.send({clientSecret: session.client_secret});
});

app.put('/api/user/:id/plusify', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findByIdAndUpdate(userId, { plus: true }, { new: true });
    if (!user) return res.status(404).send({ message: 'User not found' });
    res.send({ 
      id: user._id,
      username: user.username,
      plus: user.plus 
    });
  } 
  catch (error) { res.status(500).send({ message: 'Server error' }); }
});

// asynchronous initialization. keeps api from processesing requests until a successful connection to db is established
mongoose.connect(process.env.MONGO_URL || '').then(() => { app.listen(port, () => {}); })
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
  process.exit(1); // exit the process with an error code
});

