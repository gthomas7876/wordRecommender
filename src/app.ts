import { getAllWordsFromFile } from './utils/fileLoader';
import { getEditDistance } from './recommendations/edit-distance-calc'

interface DistanceEntry {
    word: string;
    dist: number;
}
function calcOneEditDistance(w1: string): DistanceEntry[] {
    const words = getAllWordsFromFile('assets', 'top10000.txt');
    const len = words.length;
    const minDiffLen = 2; // minimum diff of length we want to calculate distances for.  we will not recommend words with a huge distance away
    const cutOff = 5; // min edit distance cutoff
    const entries: DistanceEntry[] = [];
    for (let j = 0; j < len; j++) {
        const w2 = words[j];
        if (Math.abs(w1.length - w2.length) <= minDiffLen) {
            const dist = getEditDistance(w1, w2);
            if (dist < cutOff) {
                entries.push({ 'word': w2, 'dist': dist });
            }
        }
    }
    entries.sort((a,b) => a.dist-b.dist);
    return entries;
}

// const distances = calcAllEditDistances();
// bulkInsertIntoMongo(distances);

const stdin = process.openStdin();
console.log('Type in words and press enter to find similar/recommended words...');
const numToShow = 10;
stdin.addListener('data', d=>{
    const word = d.toString().trim().toLowerCase();
    console.log('Similar words for '+word);
    console.log(calcOneEditDistance(word).slice(0,numToShow));

})
