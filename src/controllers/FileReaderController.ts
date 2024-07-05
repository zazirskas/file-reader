import { Request, Response } from 'express';
import StateManager from '../services/StateManager';
import ScanFiles from '../services/ScanFiles';
import cacheFilePath from '../config';
import AppError from '../errors/AppError';
import * as fs from 'fs';

class FileReaderController {
  public static listFiles(_req: Request, res: Response): void {
    const filesList = StateManager.readState();

    res.status(200).json(filesList);
  }

  public static scanFiles(_req: Request, res: Response): void {
    ScanFiles.execute();

    res.status(200).json('Scan successful');
  }

  public static downloadStateFile(_req: Request, res: Response): void {
    if (!fs.existsSync(cacheFilePath)) {
      throw new AppError('File not found', 404);
    }

    res.download(cacheFilePath);
  }
}

export default FileReaderController;
