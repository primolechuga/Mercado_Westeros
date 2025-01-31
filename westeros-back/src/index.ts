import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import bodyParser from 'body-parser';
import { router } from './routes';


dotenv.config();

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,
  exposedHeaders: ['authorization'],
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use( router );
app.use(errorHandler);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


