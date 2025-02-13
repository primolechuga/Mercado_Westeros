import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import 'express-async-errors';
// import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import bodyParser from 'body-parser';
import { router } from './routes';


const app = express();
dotenv.config();
app.use(morgan('dev'));

const corsOptions = {
  origin: '*',
  credentials: true,
  exposedHeaders: ['authorization'],
};

// Crear directorios para subir archivos
const createUploadDirs = () => {
  const dirs = ['products', 'houses'];
  dirs.forEach(dir => {
    const path = `uploads/${dir}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  });
};

createUploadDirs();

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use( router );
app.use('/uploads', express.static('uploads'));
app.use(errorHandler);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


