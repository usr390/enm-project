//  3rd party imports
import cors from "cors";
const allowedOrigins = [
  'https://www.rarelygroovy.com', // Production frontend
  'http://localhost:4200'
];

const corsOptions = {
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);  // Allow the listed origins
    } else {
      callback(new Error('Not allowed by CORS'));  // Block other origins
    }
  },
  optionsSuccessStatus: 200 // For legacy browser support
};
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { DateTime } from "luxon";
const bcrypt = require('bcrypt');
const saltRounds = 10;
import rateLimit from 'express-rate-limit';
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1001, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again after 15 minutes',
})

// enm imports
import EnmEventModel from "./models/EnmEvent";
import VenueModel from "./models/Venue";
import ArtistModel from "./models/Artist";
import UserModel from "./models/User";
import { UserDTO } from "./models/UserDTO";
import PromoterModel from "./models/Promoter";
import { checkUserPlusStatus } from "./utilty/isplus";

const app = express(); app.use(cors(corsOptions)); app.use(apiLimiter)
const port = process.env.PORT || 3000
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const stripeWebHookSecret = process.env.STRIPE_API_WEBHOOK_SECRET;
const stripeWebHookSecretTest = process.env.STRIPE_API_WEBHOOK_SECRET_TEST;


app.get('/', express.json(), (req: Request, res: Response) => {
  res.send('enm-api')
})

app.get('/api/enmEvents', express.json(), async (req, res) => {
  const username = req.query.username;

  try {
    const isPlusUser = await checkUserPlusStatus(username);

    if (isPlusUser) {
      try {
        res.json(await EnmEventModel.find({ dateTime: { $gte: DateTime.now().minus({ hours: 12 }) } })
        .sort({ dateTime: 1 })
        .catch(err => console.log(err)))
      } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
    } else {
      try {
        const today = DateTime.now().minus({ hours: 12 });
        let endOfWeek = DateTime.now().endOf('week').plus({ hours: 5 });
    
        if (today.weekday === 7) { // sunday
          endOfWeek = today.plus({ weeks: 1 }).endOf('week').plus({ hours: 5 });
        }
    
        const enmEvents = await EnmEventModel.find({ 
          dateTime: { $gte: today, $lte: endOfWeek } 
        }).sort({ dateTime: 1 });
        
        res.json(enmEvents);
      } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/enmEvent', express.json(), async (req: Request, res: Response) => {
  console.log(req.body)
  const enmEvent = new EnmEventModel({
    tags: req.body.tags,
    venue: req.body.venue,
    date: req.body.date,
    doorTime: req.body.doorTime,
    dateTime: req.body.dateTime,
    cover: req.body.cover,
    artists: req.body.artists,
    creationDateTime: DateTime.now(),
    promoter: req.body.promoter,
  });
  // persist and respond to client with created EnmEvent object
  res.json(await enmEvent.save());
})

app.get('/api/venues', express.json(), async (req: Request, res: Response) => {
  res.json(await VenueModel.find().catch(err => console.log(err)))
})

app.post('/api/venue', express.json(), async (req: Request, res: Response) => {
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

app.get('/api/artists', express.json(), async (req: Request, res: Response) => {
  res.json(await ArtistModel.find().catch(err => console.log(err)))
})

app.post('/api/login', express.json(), async (req: Request, res: Response) => {
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

app.post('/api/create-user', express.json(), async (req: Request, res: Response) => {
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

app.post('/api/create-checkout-session', express.json(), async (req, res) => {
  const userid = req.body.userid;
  const session = await stripe.checkout.sessions.create({
    line_items: [{
      price: 'price_1ONPePCJybB30Zxsdnlf7CCK',
      quantity: 1,
    }],
    mode: 'subscription',
    ui_mode: 'embedded',
    return_url: 'https://rarelygroovy.com/checkout/return',
    // hardcoded data for demo purposes. mimics receiving userid from client
    metadata: {
      userid: userid
    }
  });

  res.send({clientSecret: session.client_secret});
});

app.post('/api/stripe-new-subscription-handler', express.raw({type: 'application/json'}), async (req, res) => {

  const sig = req.headers['stripe-signature'];

  try {
    // construct the event sent by Stripe
    const event = stripe.webhooks.constructEvent(req.body, sig, stripeWebHookSecret);
    res.status(200).send('OK');
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object; // this is the session object
      const userId = session.metadata.userid; // replace 'userid' with the actual key you used

      if (userId) {
        // Update the user in your database
        await UserModel.findByIdAndUpdate(userId, { plus: true }, { new: true });
      } else {
        console.log('No userID found in metadata');
      }
    }
  } catch (err) {
    // on error, return the error message
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

});

app.post('/api/stripe-new-subscription-handler-test', express.raw({type: 'application/json'}), async (req, res) => {

  const sig = req.headers['stripe-signature'];

  try {
    // construct the event sent by Stripe
    const event = stripe.webhooks.constructEvent(req.body, sig, stripeWebHookSecretTest);
    res.status(200).send('OK');
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object; // this is the session object
      const userId = session.metadata.userid; // replace 'userid' with the actual key you used

      if (userId) {
        // Update the user in your database
        await UserModel.findByIdAndUpdate(userId, { plus: true }, { new: true });
      } else {
        console.log('No userID found in metadata');
      }
    }
  } catch (err) {
    // on error, return the error message
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

app.put('/api/user/:id/plusify', express.json(), async (req, res) => {
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

app.get('/api/promoters', express.json(), async (req: Request, res: Response) => {
  res.json(await PromoterModel.find().catch(err => console.log(err)))
})

app.get('/api/getFurthestEventDateTime', express.json(), async (req: Request, res: Response) => {
  try {
    const furthestEventDateTime = await EnmEventModel.findOne().sort({ dateTime: -1 }).select('dateTime -_id');
    res.json(furthestEventDateTime.dateTime);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching furthest event');
  }
})

app.get('/api/getUser/:username', express.json(), async (req, res) => {
  try {
    // Extract the userid from the request parameters
    const { username } = req.params;

    // Find the user by userid, excluding the password field
    const user = await UserModel.findOne({ username: username }, 'username plus');

    if (user) {
      // Send back the user data excluding the password
      res.json({user: user});
    } else {
      // If no user is found, send a 404 response
      res.status(404).send('User not found');
    }
  } catch (error) {
    // If there's an error, send a 500 response
    res.status(500).send(error.message);
  }
});


// asynchronous initialization. keeps api from processesing requests until a successful connection to db is established
mongoose.connect(process.env.MONGO_URL || '').then(() => { app.listen(port, () => {}); })
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
  process.exit(1); // exit the process with an error code
});

