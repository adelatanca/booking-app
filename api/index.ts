import express, { Response, Request } from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

import cors from 'cors';
const bodyParser = require('body-parser');
const User = require('./models/User.ts');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MONGO_URL = process.env.MONGO_URL;

const cookieParser = require('cookie-parser');
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'ade3403040sajdjsa0303';

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
  })
);

if (!MONGO_URL) {
  throw new Error('MONGO_URL is not defined in the environment');
}

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.get('/test', (req: Request, res: Response) => {
  res.json('test ok');
});

app.post('/register', async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req?.body;

  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
          name: userDoc.name,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        }
      );
    } else {
      res.status(422).json('pass not ok');
    }
  } else {
    res.json('not found');
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;

      const { name, email, _id } = await User.findById(userData.id);

      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

app.listen(4000);
