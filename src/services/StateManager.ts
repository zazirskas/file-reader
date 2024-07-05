import * as fs from 'fs';
import FileObject from '../types/FileObject';
import cacheFilePath from '../config';

class StateManager {
  static readState(): FileObject[] {
    if (fs.existsSync(cacheFilePath)) {
      return JSON.parse(fs.readFileSync(cacheFilePath, 'utf-8'));
    }

    return [];
  }

  static buildState(state: any): void {
    fs.writeFileSync(cacheFilePath, JSON.stringify(state), 'utf-8');
  }
}

export default StateManager;
