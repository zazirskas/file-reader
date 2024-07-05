import * as fs from 'fs';
import StateManager from '../../src/services/StateManager';
import cacheFilePath from '../../src/config';
import FileObject from '../../src/types/FileObject';

jest.mock('fs');

describe('1 - StateManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('1.1 - readState', () => {
    test('1.1.1 - should return parsed state from cache file if it exists', () => {
      const mockState: FileObject[] = [{ name: 'test', active: true, md5Hash: 'hash1' }];
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockState));

      const state = StateManager.readState();

      expect(fs.existsSync).toHaveBeenCalledWith(cacheFilePath);
      expect(fs.existsSync).toBeTruthy();
      expect(fs.readFileSync).toHaveBeenCalledWith(cacheFilePath, 'utf-8');
      expect(state).toEqual(mockState);
    });

    test('1.1.2 - should return an empty array if cache file does not exist', () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);

      const result = StateManager.readState();

      expect(fs.existsSync).toHaveBeenCalledWith(cacheFilePath);
      expect(fs.readFileSync).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('1.2 - buildState', () => {
    test('1.2.1 - should write the state to cache file', () => {
      const mockState: FileObject[] = [{ name: 'test', active: true, md5Hash: 'hash1' }];
      StateManager.buildState(mockState);

      expect(fs.writeFileSync).toHaveBeenCalledWith(cacheFilePath, JSON.stringify(mockState), 'utf-8');
    });
  });
});
