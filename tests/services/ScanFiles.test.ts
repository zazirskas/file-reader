import * as fs from 'fs';
import md5File from 'md5-file';
import StateManager from '../../src/services/StateManager';
import ScanFiles from '../../src/services/ScanFiles';
import FileObject from '../../src/types/FileObject';

jest.mock('fs');
jest.mock('md5-file');
jest.mock('../../src/services/StateManager');

describe('2 - ScanFiles', () => {
  const filesFolderPath = '/test/files';

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.FILES_FOLDER_PATH = filesFolderPath;
  });

  describe('2.1 - execute', () => {
    test('2.1.1 - should update state to set active to false for files not in folder', () => {
      const initialState: FileObject[] = [
        { name: 'file1.txt', active: true, md5Hash: 'hash1' },
        { name: 'file2.txt', active: true, md5Hash: 'hash2' },
      ];
      const filesInFolderList = ['file1.txt'];

      (StateManager.readState as jest.Mock).mockReturnValue(initialState);
      (fs.readdirSync as jest.Mock).mockReturnValue(filesInFolderList);

      ScanFiles.execute();

      expect(StateManager.readState).toHaveBeenCalled();
      expect(fs.readdirSync).toHaveBeenCalledWith(filesFolderPath);

      const expectedState: FileObject[] = [
        { name: 'file1.txt', active: true, md5Hash: 'hash1' },
        { name: 'file2.txt', active: false, md5Hash: 'hash2' },
      ];
      expect(StateManager.buildState).toHaveBeenCalledWith(expectedState);
    });

    test('2.1.2 - should add new files in the folder to the state with active set to true and md5 hash', () => {
      const initialState: FileObject[] = [{ name: 'file1.txt', active: true, md5Hash: 'hash1' }];
      const filesInFolderList = ['file1.txt', 'file3.txt'];

      (StateManager.readState as jest.Mock).mockReturnValue(initialState);
      (fs.readdirSync as jest.Mock).mockReturnValue(filesInFolderList);
      (md5File.sync as jest.Mock).mockReturnValue('hash3');

      ScanFiles.execute();

      expect(StateManager.readState).toHaveBeenCalled();
      expect(fs.readdirSync).toHaveBeenCalledWith(filesFolderPath);

      const expectedState: FileObject[] = [
        { name: 'file1.txt', active: true, md5Hash: 'hash1' },
        { name: 'file3.txt', active: true, md5Hash: 'hash3' },
      ];
      expect(StateManager.buildState).toHaveBeenCalledWith(expectedState);
      expect(md5File.sync).toHaveBeenCalledWith(`${filesFolderPath}/file3.txt`);
    });

    test('2.1.3 - should not modify state for files already in state and in folder', () => {
      const initialState: FileObject[] = [
        { name: 'file1.txt', active: true, md5Hash: 'hash1' },
        { name: 'file2.txt', active: true, md5Hash: 'hash2' },
      ];
      const filesInFolderList = ['file1.txt', 'file2.txt'];

      (StateManager.readState as jest.Mock).mockReturnValue(initialState);
      (fs.readdirSync as jest.Mock).mockReturnValue(filesInFolderList);

      ScanFiles.execute();

      expect(StateManager.readState).toHaveBeenCalled();
      expect(fs.readdirSync).toHaveBeenCalledWith(filesFolderPath);

      const expectedState: FileObject[] = [
        { name: 'file1.txt', active: true, md5Hash: 'hash1' },
        { name: 'file2.txt', active: true, md5Hash: 'hash2' },
      ];
      expect(StateManager.buildState).toHaveBeenCalledWith(expectedState);
    });
  });
});
