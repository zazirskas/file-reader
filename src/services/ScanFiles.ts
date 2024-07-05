import * as fs from 'fs';
import FileObject from '../types/FileObject';
import md5File from 'md5-file';
import StateManager from './StateManager';

class ScanFiles {
  static execute(): void {
    const filesFolderPath = String(process.env.FILES_FOLDER_PATH);

    const state: FileObject[] = StateManager.readState();

    const filesInFolderList: string[] = fs.readdirSync(filesFolderPath);

    state.forEach((file, index) => {
      if (!filesInFolderList.includes(file.name)) {
        state[index].active = false;
      } else {
        state[index].active = true;
      }
    });

    filesInFolderList.forEach(fileName => {
      const fileAlreadyInState = state.find(fileObject => fileObject.name === fileName);

      if (!fileAlreadyInState) {
        state.push({
          name: fileName,
          active: true,
          md5Hash: md5File.sync(`${filesFolderPath}/${fileName}`),
        });
      }
    });

    StateManager.buildState(state);
  }
}

export default ScanFiles;
