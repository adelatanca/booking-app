import express, { Response, Request } from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });
import cors from 'cors';
import fs from 'fs';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import imageDownloader from 'image-downloader';
import multer from 'multer';

mongoose.set('strictQuery', false);

export interface UserDataProps {
  email: String;
  id: String;
  name: String;
  iat: Number;
}

const MONGO_URL = process.env.MONGO_URL;
const User = require('./models/User.ts');
const Place = require('./models/Place.ts');
const Booking = require('./models/Booking.ts');

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

  try {
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
      res.status(404).json();
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

app.get('/profile', async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies;
    if (token) {
      const userData = jwt.verify(token, jwtSecret, {});
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    } else {
      res.json(null);
    }
  } catch (e) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.post('/logout', (req: Request, res: Response) => {
  res.cookie('token', '').json(true);
});

app.post('/upload-by-link', async (req: Request, res: Response) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  try {
    await imageDownloader.image({
      url: link,
      dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
  } catch (e) {
    res.status(422).json(e);
  }
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
      try {
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/', ''));
      } catch (e) {
        res.status(422).json(e);
      }
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

  try {
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
  } catch (e) {
    res.status(401).json(e);
  }
});

app.get('/user-places', (req: Request, res: Response) => {
  const { token } = req.cookies;

  try {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      console.log(userData);
      const { id } = userData;
      res.json(await Place.find({ owner: id }));
    });
  } catch (e) {
    res.status(401).json(e);
  }
});

app.get('/places/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    res.json(await Place.findById(id));
  } catch (e) {
    res.status(404).json(e);
  }
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

  try {
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
  } catch (e) {
    res.status(401).json(e);
  }
});

app.get('/places', async (req: Request, res: Response) => {
  try {
    res.json(await Place.find());
  } catch (e) {
    res.status(500).json(e);
  }
});

app.post('/bookings', async (req: Request, res: Response) => {
  try {
    const userData = (await getUserDataFromRequest(req)) as UserDataProps;
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
      req.body;

    const doc = await Booking.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      user: userData.id,
    });

    res.json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/bookings', async (req: Request, res: Response) => {
  try {
    const userData = (await getUserDataFromRequest(req)) as UserDataProps;
    const bookings = await Booking.find({ user: userData.id })
      .populate('place')
      .lean();

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(4000);
