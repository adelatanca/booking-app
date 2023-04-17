import express, { Response, Request } from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });
import cors from 'cors';

mongoose.set('strictQuery', false);

export interface UserDataProps {
  email: String;
  id: String;
  name: String;
  iat: Number;
}

const bodyParser = require('body-parser');
const User = require('./models/User.ts');
const Place = require('./models/Place.ts');
const Booking = require('./models/Booking.ts');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MONGO_URL = process.env.MONGO_URL;

const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'ade3403040sajdjsa0303';

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'));

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

const getUserDataFromRequest = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      req.cookies.token,
      jwtSecret,
      {},
      async (err, userData: UserDataProps) => {
        if (err) throw err;
        resolve(userData);
      }
    );
  });
};


app.post('/register', async (req: Request, res: Response) => {
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

app.get('/profile', (req: Request, res: Response) => {
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

app.post('/logout', (req: Request, res: Response) => {
  res.cookie('token', '').json(true);
});

app.post('/upload-by-link', async (req: Request, res: Response) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  });

  res.json(newName);
});

const photosMiddleware = multer({ dest: 'uploads/' });

app.post(
  '/upload',
  photosMiddleware.array('photos', 100),
  (req: Request, res: Response) => {
    const uploadedFiles: string[] = [];
    for (let i = 0; i < (req.files as unknown as File[]).length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      const newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace('uploads/', ''));
    }
    res.json(uploadedFiles);
  }
);

app.post('/places', (req: Request, res: Response) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

app.get('/user-places', (req: Request, res: Response) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get('/places/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put('/places', async (req: Request, res: Response) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json('ok');
    }
  });
});

app.get('/places', async (req: Request, res: Response) => {
  res.json(await Place.find());
});

app.post('/bookings', async (req: Request, res: Response) => {
  const userData = (await getUserDataFromRequest(req)) as UserDataProps;
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;

  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get('/bookings', async (req: Request, res: Response) => {
  // because they are private, we need jwt verification
  const userData = (await getUserDataFromRequest(req)) as UserDataProps;
  const bookings = await Booking.find({ user: userData.id })
    .populate('place')
    .lean();

  res.json(bookings);
});

app.listen(4000);
