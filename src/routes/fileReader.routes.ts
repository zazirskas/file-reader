import { Router } from 'express';
import FileReaderController from '../controllers/FileReaderController';

const fileReaderRouter = Router();

fileReaderRouter.get('/list', FileReaderController.listFiles);

fileReaderRouter.get('/scan', FileReaderController.scanFiles);

fileReaderRouter.get('/download-state', FileReaderController.downloadStateFile);

export default fileReaderRouter;
