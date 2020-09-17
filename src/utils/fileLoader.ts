import * as fs from 'fs';
import * as path from 'path'
export function getAllWordsFromFile(dir = 'assets', file = 'usa.txt'): string[] {
    const data = fs.readFileSync(path.resolve(dir,file), 'utf8');
    // split the contents by new line
    const lines = data.split(/\r?\n/);
    return lines;
}