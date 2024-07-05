import { Request, Response } from 'express';
import FileReaderController from '../../src/controllers/FileReaderController';
import StateManager from '../../src/services/StateManager';
import ScanFiles from '../../src/services/ScanFiles';
import cacheFilePath from '../../src/config';
import AppError from '../../src/errors/AppError';
import * as fs from 'fs';

jest.mock('../../src/services/StateManager');
jest.mock('../../src/services/ScanFiles');
jest.mock('fs');
jest.mock('../../src/errors/AppError');

describe('3 - FileReaderController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {} as Partial<Request>;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      download: jest.fn().mockReturnThis(),
    } as Partial<Response>;
  });

  describe('3.1 - listFiles', () => {
    it('3.1.1 - should return the list of files from StateManager', () => {
      const mockFilesList = [{ name: 'file1.txt', active: true }];
      (StateManager.readState as jest.Mock).mockReturnValue(mockFilesList);

      FileReaderController.listFiles(req as Request, res as Response);

      expect(StateManager.readState).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockFilesList);
    });
  });

  describe('3.2 - scanFiles', () => {
    it('3.2.1 - should execute ScanFiles and return a success message', () => {
      FileReaderController.scanFiles(req as Request, res as Response);

      expect(ScanFiles.execute).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith('Scan successful');
    });
  });

  describe('3.3 - downloadStateFile', () => {
    it('3.3.1 - should download the state file if it exists', () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);

      FileReaderController.downloadStateFile(req as Request, res as Response);

      expect(fs.existsSync).toHaveBeenCalledWith(cacheFilePath);
      expect(res.download).toHaveBeenCalledWith(cacheFilePath);
    });

    it('3.3.2 - should throw an error if the state file does not exist', () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);

      try {
        FileReaderController.downloadStateFile(req as Request, res as Response);
      } catch (error) {
        expect(fs.existsSync).toHaveBeenCalledWith(cacheFilePath);
        expect(AppError).toHaveBeenCalledWith('File not found', 404);
      }
    });
  });
});
