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
import PromoCodeModel from "./models/PromoCode";

const app = express(); app.use(cors(corsOptions)); app.use(apiLimiter)
const port = process.env.PORT || 3000
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const stripeWebHookSecret = process.env.STRIPE_API_WEBHOOK_SECRET;
const stripeTest = require('stripe')(process.env.STRIPE_API_KEY_TEST)
const stripeWebHookSecretTest = process.env.STRIPE_API_WEBHOOK_SECRET_TEST;


app.get('/', express.json(), (req: Request, res: Response) => {
  res.send('enm-api')
})

app.get('/api/enmEvents', express.json(), async (req, res) => {
  const username = req.query.username;
  console.log({
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    query: req.query,
    status: res.statusCode, // Note: This might need to be logged after response is sent
    responseTime: `${res.getHeader('X-Response-Time')}ms`, // Requires middleware to set this header
    headers: req.headers, // Be cautious about sensitive data
    clientIP: req.ip,
    userAgent: req.get('User-Agent')
    // ... any other properties you find relevant
  });
  try {
    const isPlusUser = await checkUserPlusStatus(username);

    if (isPlusUser) {
      try {
        res.json(await EnmEventModel.find({ dateTime: { $gte: DateTime.now().minus({ hours: 8 }) } })
        .sort({ dateTime: 1 })
        .catch(err => console.log(err)))
      } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
    } else {
      try {
        const today = DateTime.now().minus({ hours: 8 });

        let endOfWeek = DateTime.now().endOf('week').plus({ hours: 5 });
    
        if (today.weekday === 6 || today.weekday === 7) { // saturday or sunday
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
  const creationDateTime = DateTime.now()
  const enmEvent = new EnmEventModel({
    tags: req.body.tags,
    venue: req.body.venue,
    date: req.body.date,
    doorTime: req.body.doorTime,
    dateTime: req.body.dateTime,
    cover: req.body.cover,
    artists: req.body.artists,
    creationDateTime: creationDateTime,
    promoter: req.body.promoter,
    flyer: 'pending',
    updates: [{
      date: creationDateTime,
      message: "Event added to Rarelygroovy"
    }]
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

app.get('/api/artistDirectory', express.json(), async (req: Request, res: Response) => {
  const username = req.query.username;

  try {
    const isPlusUser = await checkUserPlusStatus(username);

    const commonQuery = {
      $or: [
        {
          location: "RGV",
          start: { $exists: true, $ne: "pending" }
        },
        {
          location: { $ne: "RGV" }
        }
      ],
      $expr: {
        $gt: [
          {
            $size: {
              $filter: {
                input: { $objectToArray: { $ifNull: ["$links", {}] } },
                as: "link",
                cond: { $ne: ["$$link.v", "pending"] }
              }
            }
          },
          0
        ]
      }
    };

    if (isPlusUser) {
      try {
        console.log('ad but through plus channel!');
        // Query for plus users
        res.json(await ArtistModel.find(commonQuery).catch(err => console.log(err)));
      } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
    } else {
      try {
        console.log('ad but through non-plus channel!');
        // Query for non-plus users
        res.json(await ArtistModel.find({
          end: "pending",
          ...commonQuery
        }).catch(err => console.log(err)));
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
  const { username, password, promoCode } = req.body;

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

    // Promo code redemption logic
    if (promoCode) {
      const promo = await PromoCodeModel.findOne({ promoCode: promoCode, isUsed: false });
      if (promo) {
        // Logic to apply the promo to the newUser
        newUser.plus = true; // Example adjustment based on your promo

        // Update the promo code as used
        promo.isUsed = true;
        promo.userId = newUser._id; // assuming _id is the field for user ID
        const now = new Date();
        promo.activatedAt = now;
        const expiresAt = new Date(now);
        expiresAt.setMonth(expiresAt.getMonth() + 1);
        promo.expiresAt = expiresAt;  

        await promo.save();
      } else {
        // Optionally handle invalid promo code scenario
      }
    }

    await newUser.save();

    const userDTO = new UserDTO(newUser.id, newUser.username, newUser.plus);

    res.status(201).json({ user: { ...userDTO } });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/get-promo-code/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const promoCode = await PromoCodeModel.findOne({ userId: userId });

    if (promoCode) {
      res.json({ 
        success: true, 
        promoCode: promoCode,
      });
    } else {
      res.status(404).json({ success: false, message: 'No available promo code found for this user.' });
    }
  } catch (error) {
    console.error('Error retrieving promo code:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/api/create-checkout-session', express.json(), async (req, res) => {
  const userid = req.body.userid;
  const session = await stripe.checkout.sessions.create({
    line_items: [{
      price: 'price_1OXsJeCJybB30ZxsKnyXMpdq',
      quantity: 1,
    }],
    mode: 'subscription',
    ui_mode: 'embedded',
    return_url: 'https://rarelygroovy.com/checkout/return',
    metadata: {
      userid: userid
    }
  });

  res.send({clientSecret: session.client_secret});
});

app.post('/api/create-checkout-session-test', express.json(), async (req, res) => {

  console.log('fired!')
  const userid = req.body.userid;
  console.log('from test create checkout session api: ', userid)
  const session = await stripeTest.checkout.sessions.create({
    line_items: [{
      price: 'price_1ORkd9CJybB30ZxsUYIcvfLk',
      quantity: 1,
    }],
    mode: 'subscription',
    ui_mode: 'embedded',
    return_url: 'https://rarelygroovy.com/checkout/return',
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
      const customerId = session.customer; // stripe customer id

      if (userId) {
        // Update the user in your database
        await UserModel.findByIdAndUpdate(userId, { plus: true, stripeCustomerId: customerId }, { new: true });
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
      console.log('from test webhook', userId)
      const customerId = session.customer; // stripe customer id

      if (userId) {
        // Update the user in your database
        await UserModel.findByIdAndUpdate(userId, { plus: true, stripeCustomerId: customerId  }, { new: true });
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
    const user = await UserModel.findOne({ username: username }, 'username plus expires');

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

app.get('/api/next-invoice-date/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Initialize response shape
    let response = {
      nextInvoiceDate: null,
      subscriptionStatus: null,
      cancellationDate: null,
      invoiceHistory: [],
      chargesHistory: [], // Added to include charge history
      promoCode: null
    };

    // Retrieve the user and their Stripe customer ID
    const user = await UserModel.findById(userId).select('stripeCustomerId -_id').exec();

    // Proceed only if user and stripeCustomerId exist
    if (user && user.stripeCustomerId) {
      // Retrieve subscription data
      try {
        const subscriptions = await stripe.subscriptions.list({
          customer: user.stripeCustomerId,
          status: 'all',
          limit: 1
        });

        if (subscriptions.data.length > 0) {
          const subscription = subscriptions.data[0];
          response.subscriptionStatus = subscription.status;

          if (subscription.canceled_at) {
            response.cancellationDate = new Date(subscription.canceled_at * 1000);
          }
        }
      } catch (subscriptionError) {
        console.error('Error fetching subscription:', subscriptionError);
      }

      // Retrieve the upcoming invoice
      try {
        const upcomingInvoice = await stripe.invoices.retrieveUpcoming({ customer: user.stripeCustomerId });
        response.nextInvoiceDate = upcomingInvoice.next_payment_attempt ? new Date(upcomingInvoice.next_payment_attempt * 1000) : null;
      } catch (invoiceError) {
        if (!invoiceError.message || !invoiceError.message.includes('No upcoming invoices for customer')) {
          throw invoiceError;
        }
      }

      // Retrieve invoice history
      try {
        const invoices = await stripeTest.invoices.list({
          customer: user.stripeCustomerId,
          limit: 10
        });

        response.invoiceHistory = invoices.data.map(invoice => ({
          invoiceId: invoice.id,
          amountPaid: invoice.amount_paid,
          status: invoice.status,
          billingPeriodStart: invoice.period_start ? new Date(invoice.period_start * 1000) : null,
          billingPeriodEnd: invoice.period_end ? new Date(invoice.period_end * 1000) : null
        }));
      } catch (invoiceHistoryError) {
        console.error('Error fetching invoice history:', invoiceHistoryError);
      }

      // Retrieve charge history
      try {
        const charges = await stripe.charges.list({
          customer: user.stripeCustomerId,
          limit: 10 // You can adjust the limit as needed
        });

        response.chargesHistory = charges.data.map(charge => ({
          chargeId: charge.id,
          amount: charge.amount,
          created: new Date(charge.created * 1000),
          status: charge.status,
          currency: charge.currency
          // Include any other relevant charge fields here
        }));
      } catch (chargeError) {
        console.error('Error fetching charge history:', chargeError);
      }
    }

    //promoCode
    try {
      const promoCode = await PromoCodeModel.findOne({
        userId: userId, // Make sure this matches the field and type stored in your PromoCode schema
      }).exec();

      if (promoCode) {
        // Constructing a simplified object with promo code details. Adjust according to what details you need.
        const promoCodeDetails = {
          activatedAt: promoCode.activatedAt,
          expiresAt: promoCode.expiresAt,
          // Add any other relevant fields you need
        };
    
        // Add it to your response object
        response.promoCode = promoCodeDetails; 
      } 
    }
    catch (chargeError) {
      console.error('Error fetching charge history:', chargeError);
    }
    


    // Send the response
    res.send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});



app.post('/api/cancel-subscription/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Retrieve the Stripe customer ID for the given user ID from your database
    const user = await UserModel.findById(userId).select('stripeCustomerId -_id').exec();

    if (!user || !user.stripeCustomerId) {
      return res.status(404).send({ error: 'User not found or Stripe customer ID missing' });
    }

    // Retrieve the active subscription for this Stripe customer
    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      status: 'active',
      limit: 1
    });

    if (subscriptions.data.length === 0) {
      return res.status(404).send({ error: 'Active subscription not found for this customer.' });
    }

    // Get the subscription ID
    const subscriptionId = subscriptions.data[0].id;

    // Cancel the subscription
    const canceledSubscription = await stripe.subscriptions.cancel(subscriptionId);

    // Update the user's status to 'not plus'
    await UserModel.findByIdAndUpdate(userId, { plus: false });

    // Send a response back to the client
    res.send({ message: 'Subscription canceled and user de-plusified successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const predefinedIds = [
  "6670b1a4de365201d3e6d35f", // amani's open mic @ luna
  "6671a1fcde365201d3e6dec2", // carl's open mic @ cork
  "66859c5650d851839c3a67b0", // emi and borracho's open decks @ flying walrus
  "6685a04223cab62867eefdb9", // yung hick's open mic @ gremlin
  "66672a5c01e79e4949bd7c11", // indigo's flying mic @ flying walrus
];

app.get('/api/bump-weekly-recurring-events', async (req: Request, res: Response) => {
  try {
    const events = await EnmEventModel.find({ _id: { $in: predefinedIds.map(id => new mongoose.Types.ObjectId(id)) } });

    const bulkOps = events.map(event => ({
      updateOne: {
        filter: { _id: event._id },
        update: { $set: { dateTime: new Date(event.dateTime.getTime() + 7 * 24 * 60 * 60 * 1000) } }
      }
    }));

    const result = await EnmEventModel.bulkWrite(bulkOps);

    res.send(`${result.modifiedCount} documents were updated`);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});





// asynchronous initialization. keeps api from processesing requests until a successful connection to db is established
mongoose.connect(process.env.MONGO_URL || '').then(() => { app.listen(port, () => {}); })
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
  process.exit(1); // exit the process with an error code
});

