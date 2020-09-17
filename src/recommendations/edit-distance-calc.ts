const keyboardCartesian: { [key: string]: { [key: string]: number } } = {
    'q': { 'x': 0, 'y': 0 },
    'w': { 'x': 1, 'y': 0 },
    'e': { 'x': 2, 'y': 0 },
    'r': { 'x': 3, 'y': 0 },
    't': { 'x': 4, 'y': 0 },
    'y': { 'x': 5, 'y': 0 },
    'u': { 'x': 6, 'y': 0 },
    'i': { 'x': 7, 'y': 0 },
    'o': { 'x': 8, 'y': 0 },
    'p': { 'x': 9, 'y': 0 },
    'a': { 'x': 0, 'y': 1 },
    'z': { 'x': 0, 'y': 2 },
    's': { 'x': 1, 'y': 1 },
    'x': { 'x': 1, 'y': 2 },
    'd': { 'x': 2, 'y': 1 },
    'c': { 'x': 2, 'y': 2 },
    'f': { 'x': 3, 'y': 1 },
    'b': { 'x': 4, 'y': 2 },
    'm': { 'x': 5, 'y': 2 },
    'j': { 'x': 6, 'y': 1 },
    'g': { 'x': 4, 'y': 1 },
    'h': { 'x': 5, 'y': 1 },
    'k': { 'x': 7, 'y': 1 },
    'l': { 'x': 8, 'y': 1 },
    ';': { 'x': 9, 'y': 1 },
    "'": { 'x': 10,'y': 1 },
    'v': { 'x': 3, 'y': 2 },
    'n': { 'x': 5, 'y': 2 }
}

function euclideanDistance(a: string, b: string) {
    if (!(a in keyboardCartesian)) {
        throw new Error(a + ' NOT IN');
    }
    if (!(b in keyboardCartesian)) {
        throw new Error(b + ' NOT IN')
    }
    const x = (keyboardCartesian[a].x - keyboardCartesian[b].x) ** 2;
    const y = (keyboardCartesian[a].y - keyboardCartesian[b].y) ** 2;
    const weight = .35;
    const dist = Math.sqrt(x + y) * weight;
    return dist;
}

export function getEditDistance(str1: string, str2: string): number {
    // Write your code here.
    const dp = Array(str1.length + 1).fill(0).map(x => Array(str2.length + 1).fill(0));
    // [0][0] denotes empty string.  going down is adding to str1, right is adding to str2, diagonal is swapping
    for (let i = 0; i <= str1.length; i++) {
        dp[i][0] = i;
    }
    for (let j = 0; j <= str2.length; j++) {
        dp[0][j] = j;
    }

    for (let i = 1; i <= str1.length; i++) {
        for (let j = 1; j <= str2.length; j++) {
            if (str1[i - 1] === str2[j - 1]) {// same, no change
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                const add = dp[i - 1][j] + 1;
                const remove = dp[i][j - 1] + 1;
                const swap = dp[i - 1][j - 1] + euclideanDistance(str1[i - 1], str2[j - 1]);
                dp[i][j] = Math.min(add,remove,swap);
            }
        }
    }
    return dp[str1.length][str2.length];
}