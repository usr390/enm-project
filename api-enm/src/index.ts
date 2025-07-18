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
import { randomUUID } from 'crypto';

// enm imports
import EnmEventModel from "./models/EnmEvent";
import VenueModel from "./models/Venue";
import ArtistModel from "./models/Artist";
import UserModel from "./models/User";
import { UserDTO } from "./models/UserDTO";
import PromoterModel from "./models/Promoter";
import { checkUserPlusStatus } from "./utilty/isplus";
import PromoCodeModel from "./models/PromoCode";
import BlogModel from "./models/Blog";

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
        res.json(await EnmEventModel.find({
          verified: true,
          dateTime: { $gte: DateTime.now().minus({ hours: 8 }) }
        })
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
          verified: true,
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

app.get('/api/enmEventsTrans', express.json(), async (req, res) => {
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

    if (true) {
      try {
        res.json(await EnmEventModel.find({
          verified: true,
          dateTime: { $gte: DateTime.now().minus({ hours: 8 }) }
        })
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
          verified: true,
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

// Past events endpoint (Rarelygroovy+ only, capped at 1 month back)

app.get('/api/enmEvents/pastTrans', express.json(), async (req, res) => {
  const username = req.query.username;
  try {
    const isPlusUser = true;
    if (!isPlusUser) {
      return res
        .status(403)
        .send('Forbidden: Rarelygroovy+ required to view past events');
    }

    const cutoff = DateTime.now().minus({ hours: 8 }).toJSDate();

    const pastEvents = await EnmEventModel.find({
      verified: true,
      dateTime: { $lt: cutoff }
    }).sort({ dateTime: -1 });

    res.json(pastEvents);
  } catch (err) {
    console.error('Error fetching past events:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/enmEvents/past', express.json(), async (req, res) => {
  const username = req.query.username;
  try {
    const isPlusUser = await checkUserPlusStatus(username);
    if (!isPlusUser) {
      return res
        .status(403)
        .send('Forbidden: Rarelygroovy+ required to view past events');
    }

    const cutoff = DateTime.now().minus({ hours: 8 }).toJSDate();

    const pastEvents = await EnmEventModel.find({
      verified: true,
      dateTime: { $lt: cutoff }
    }).sort({ dateTime: -1 });

    res.json(pastEvents);
  } catch (err) {
    console.error('Error fetching past events:', err);
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
    flyer: req.body.flyer?.trim() || 'pending',
    updates: [{
      date: creationDateTime,
      message: "Event added to Rarelygroovy"
    }],
    verified: false,
    submittedBy: req.body.submittedBy
  });
  // Save the enmEvent object
  const savedEvent = await enmEvent.save();

  // Log the saved object
  console.log(savedEvent);

  // Respond to client with the saved object
  res.json(savedEvent);

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
          location: "RGV", // <- restrict to local artists only
          start: { $exists: true, $ne: "pending" },
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

app.get('/api/artistDirectoryTrans', express.json(), async (req: Request, res: Response) => {
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

    if (true) {
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
          location: "RGV", // <- restrict to local artists only
          start: { $exists: true, $ne: "pending" },
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
    const userDTO = new UserDTO(user.id, user.username, user.plus, user.appAccountToken_apple);
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
      plus: false,
      appAccountToken_apple: randomUUID()
    });

    // Promo code redemption logic
    if (promoCode && promoCode === '5202a37942b799e8') {
      // leiah's promo code that she accidentally leaked to everyone
      const newPromo = await PromoCodeModel.findOne({ isUsed: false });
      if (newPromo) {
        // Logic to apply the new promo to the newUser
        newUser.plus = true; // Example adjustment based on your promo

        // Update the new promo code as used
        newPromo.isUsed = true;
        newPromo.userId = newUser._id; // assuming _id is the field for user ID
        const now = new Date();
        newPromo.activatedAt = now;
        const expiresAt = new Date(now);
        expiresAt.setMonth(expiresAt.getMonth() + 1);
        newPromo.expiresAt = expiresAt;

        await newPromo.save();
      } else {
        // Handle case where no unused promo code is available
      }
    }
    else if (promoCode) {
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

    const userDTO = new UserDTO(newUser.id, newUser.username, newUser.plus, newUser.appAccountToken_apple);

    res.status(201).json({ user: { ...userDTO } });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/delete-user/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await UserModel.deleteOne({ _id: userId });
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting user:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
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
      price: 'price_1QGMbTCJybB30Zxs86gY7o9L',
      quantity: 1,
    }],
    mode: 'payment',
    ui_mode: 'embedded',
    return_url: 'https://rarelygroovy.com/checkout/return',
    metadata: {
      userid: userid
    }
  });

  res.send({clientSecret: session.client_secret});
});

app.post('/api/create-checkout-session-test', express.json(), async (req, res) => {
  const userid = req.body.userid;

  const customer = await stripeTest.customers.create({});


  const session = await stripeTest.checkout.sessions.create({
    line_items: [{
      price: 'price_1QGNKPCJybB30Zxsg6wIprWh',
      quantity: 1,
    }],
    mode: 'payment',
    ui_mode: 'embedded',
    // return_url: 'https://rarelygroovy.com/checkout/return',
    return_url: 'http://localhost:4200/checkout/return',
    metadata: {
      userid: userid
    },
    customer: customer.id, // Use the created customer ID
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
    const event = stripeTest.webhooks.constructEvent(req.body, sig, stripeWebHookSecretTest);
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
    const user = await UserModel.findOne({ username: username }, 'username plus expires appAccountToken_apple');

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
        const invoices = await stripe.invoices.list({
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

app.get('/api/next-invoice-date-test/:userId', async (req, res) => {
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
        const subscriptions = await stripeTest.subscriptions.list({
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
        const upcomingInvoice = await stripeTest.invoices.retrieveUpcoming({ customer: user.stripeCustomerId });
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
        const charges = await stripeTest.charges.list({
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

app.get('/api/payment-history/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Initialize response shape
    let response = {
      chargesHistory: [],
      invoiceHistory: [],
      promoCode: null
    };

    // Retrieve the user and their Stripe customer ID
    const user = await UserModel.findById(userId).select('stripeCustomerId -_id').exec();
    console.log(user)

    // Proceed only if user and stripeCustomerId exist
    if (user && user.stripeCustomerId) {
      // Retrieve charge history
      try {
        const charges = await stripeTest.charges.list({
          customer: user.stripeCustomerId,
          limit: 10 // Adjust as needed
        });

        response.chargesHistory = charges.data.map(charge => ({
          chargeId: charge.id,
          amount: charge.amount,
          created: new Date(charge.created * 1000),
          status: charge.status,
          currency: charge.currency
        }));
      } catch (chargeError) {
        console.error('Error fetching charge history:', chargeError);
      }

      // Retrieve invoice history (one-time payments create invoices as well)
      try {
        const invoices = await stripe.invoices.list({
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
    }

    // Retrieve promo code if applicable
    try {
      const promoCode = await PromoCodeModel.findOne({
        userId: userId, // Ensure this matches your PromoCode schema
      }).exec();

      if (promoCode) {
        const promoCodeDetails = {
          activatedAt: promoCode.activatedAt,
          expiresAt: promoCode.expiresAt,
        };
        response.promoCode = promoCodeDetails; 
      } 
    } catch (promoCodeError) {
      console.error('Error fetching promo code:', promoCodeError);
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
  // "6670b1a4de365201d3e6d35f", // amani's open mic @ luna
  // "6671a1fcde365201d3e6dec2", // carl's open mic @ cork
  // "66859c5650d851839c3a67b0", // emi and borracho's open decks @ flying walrus
  // "6685a04223cab62867eefdb9", // yung hick's open mic @ gremlin
  // "66672a5c01e79e4949bd7c11", // indigo's flying mic @ flying walrus
  "6684c89950d851839c3a628f", // wolfie's hop shop every other wed
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

// new endpoint to get the number of artists from RGV who have reached an end
app.get('/api/rgv-defunct-artists-count', express.json(), async (req: Request, res: Response) => {
  try {
    // query to find artists with location "RGV" and end property not equal to "pending"
    const rgvDefunctArtistsCount = await ArtistModel.countDocuments({ 
      location: "RGV", 
      end: { $ne: "pending" }
    });

    // return the count in the response
    res.send(rgvDefunctArtistsCount.toString());
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/blogs', express.json(), async (req: Request, res: Response) => {
  res.json(await BlogModel.find().catch(err => console.log(err)))
})

// returns count of events beyond the free-user limit
app.get('/api/enmEvents/number-of-events-passed-free-limit', express.json(), async (req, res) => {
  try {
    // 1) figure out the “free” cutoff just as you already do
    const now = DateTime.now().minus({ hours: 8 });
    let endOfWeek = DateTime.now().endOf('week').plus({ hours: 5 });
    if (now.weekday === 6 || now.weekday === 7) {
      endOfWeek = now.plus({ weeks: 1 }).endOf('week').plus({ hours: 5 });
    }

    // 2) count everything beyond that cutoff
    const extraCount = await EnmEventModel.countDocuments({
      verified: true,
      dateTime: { $gt: endOfWeek.toJSDate() }
    });

    // 3) find the furthest‐out event’s date
    const furthestEvent = await EnmEventModel
      .findOne({ verified: true })
      .sort({ dateTime: -1 })
      .select('dateTime')
      .lean();

    // 4) extract its month name
    let furthestMonth = null;
    if (furthestEvent?.dateTime) {
      furthestMonth = DateTime
        .fromJSDate(furthestEvent.dateTime)
        .toFormat('LLLL yyyy');   // e.g. “March 2026”
    }

    // count past events starting from yesterday and going backwards
    const yesterday = DateTime.now().minus({ days: 1 }).toJSDate();
    const pastEvents = await EnmEventModel.countDocuments({
      verified: true,
      dateTime: { $lt: yesterday }
    });

    // 5) send both back
    res.json({
      extraEvents: extraCount,
      furthestMonth,
      pastEvents
    });

  } catch (err) {
    console.error('Error fetching free-extra count:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/artists/local-inactive-count', express.json(), async (req, res) => {
  try {
    // 1) count all artists with location "RGV" whose status is not "active"
    const inactiveCount = await ArtistModel.countDocuments({
      location: "RGV",
      status:   { $ne: "active" }
    });

    // 2) count all artists whose location is NOT "RGV"
    const touringCount = await ArtistModel.countDocuments({
      location: { $ne: "RGV" }
    });

    // 3) send both back
    res.json({
      inactiveLocalArtists: inactiveCount,
      touringArtists:       touringCount
    });

  } catch (err) {
    console.error('Error fetching local/inactive & touring counts:', err);
    res.status(500).send('Internal Server Error');
  }
});

// POST /api/normalize-events
// app.post('/api/normalize-events', express.json(), async (req, res) => {
//   const eventIds = req.body.eventIds;

//   if (!Array.isArray(eventIds) || eventIds.length === 0) {
//     return res.status(400).json({ error: 'eventIds must be a non-empty array' });
//   }

//   try {
//     const events = await EnmEventModel.find({ _id: { $in: eventIds } });
//     const results = [];

//     for (const event of events) {
//       try {
//         const stripParens = (s) => s.replace(/\s*\([^)]*\)/g, '').trim();

//         // Validate required fields
//         if (!Array.isArray(event.artists2)) {
//           results.push({ id: event._id, error: 'Missing artist2 names' });
//           continue;
//         }

//         const artistNames = event.artists2
//           .map((a) => typeof a === 'string' ? stripParens(a.trim()) : null)
//           .filter((name) => typeof name === 'string' && name.length > 0);

//         // Lookups
//         const artistRegexes = artistNames.map(name => new RegExp(`^${name}$`, 'i'));
//         const matchedArtists = await ArtistModel.find({ name: { $in: artistRegexes } });

//         const nameToArtist = new Map(matchedArtists.map(a => [a.name.toLowerCase(), a]));
//         const orderedArtists = artistNames
//           .map(name => nameToArtist.get(name.toLowerCase()))
//           .filter(Boolean);

//         if (orderedArtists.length === 0) {
//           results.push({ id: event._id, warning: 'No matching artists found' });
//         }

//         // Update fields
//         event.set('artists', orderedArtists);

//         const tags = [];
//         if (event.venue?.name) tags.push(event.venue.name);
//         if (event.venue?.city) tags.push(event.venue.city);
//         event.set('tags', tags);

//         if (event.year && event.month && event.day) {
//           const y = event.year;
//           const m = event.month - 1;
//           const d = event.day;

//           event.set('date', new Date(Date.UTC(y, m, d, 5, 0, 0)));
//           event.set('doorTime', null);
//           event.set('dateTime', new Date(Date.UTC(y, m, d + 1, 4, 59, 0)));
//         }

//         await event.save();
//         results.push({ id: event._id, status: 'ok' });

//       } catch (err) {
//         results.push({ id: event._id, error: err.message, stack: err.stack });
//       }
//     }

//     res.json({ results });

//   } catch (err) {
//     console.error('Batch normalization failed:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });



// asynchronous initialization. keeps api from processesing requests until a successful connection to db is established
mongoose.connect(process.env.MONGO_URL || '').then(() => { app.listen(port, () => {}); })
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
  process.exit(1); // exit the process with an error code
});

function stripParens(text: string): string {
  return text.replace(/\s*\(.*?\)\s*/g, '').trim();
}