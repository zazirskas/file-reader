import express from 'express';
import fileReaderRouter from './routes/fileReader.routes';
import ScanFiles from './services/ScanFiles';
import errorHandler from './middleware/errorHandler';
import 'express-async-errors';

ScanFiles.execute();
console.log('Initial application state built');

const app = express();

app.use(express.json());

app.use(fileReaderRouter);

app.use(errorHandler);

export default app;
