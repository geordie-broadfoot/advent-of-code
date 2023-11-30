import { exec } from "./base.js";

const testinput = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

const rawinput = `abaaacccccccccaaaaaaccccccccccccccccaacccccccccccaacaaaaaaaaaaaaaaaaaccaaaaacccaaaaccccccccccccccccccccccccccccccccccccccccccccccccccccccccaaaaa
abaaacccccccccaaaaaacccccccccccccccaaaaccccccccccaaaaaaaacaaaaaaaaaaaccaaaaaaccaaaacccccccccccccccccccccccccccccccccccccccccccccccccccccccaaaaaa
abaaaccccccccccaaaaacccccccccccccccaaaacccccccccccaaaaacccaaaaaaaaaacccaaaaaacccaaccccccccccccccaaaaacccccccccccccccccccccccccccccccccccccaaaaaa
abccccaaccccccaaaaacccccccccaaaaaccaaaaccccccccccccaaaaacaaaaaaaaacccccaaaaaccccccccccccccccccccaaaaacccccccccccccccccaaaccccaaaccccccccccaaacaa
abcccaaaacccccaaaaacccccccccaaaaacccccccccccccccccaaacaaaaaaaaaacccccccaaaaacccccccccccccccccccaaaaaacccccccccccccccccaaaaccaaaaccccccccccccccaa
abcccaaaaacacccccccccccccccaaaaaaccccccccccccccccccaaccaaaaacaaaaccccccccccccccccccccccccccccccaaaaaaccccccccccccccccccaaaaaaaacccccccccccccccaa
abaaaaaaaaaacccccccccccccccaaaaaaccccccccccccccccccccccaaaacccaaaccccccccccccccccccccccccccccccaaaaaacccccccccccccccciiiiijaaaaccccccccccccccccc
abaaaaaaaaaacccccccccccccccaaaaaacccccccccccccccccccccccccccccaaacccccccccccccccccccccccccccccccaaaccccccccccccccccciiiiiijjjaccccccccaaaccccccc
abccaaaaaaccccccccccccccccccaaaccccccccccccccccccccccccccccccccacccccccccccaacccccccccccccccccccccccccccccccccccccciiiiioijjjjaaccccccaaaaaacccc
abccaaaaaacccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccaaaaaacccccccccccccccccccccccccccccccccccciiinnooojjjjjaaccaaaaaaaacccc
abccaaaaaacccccccccccccccccccccccccccccccccccccaacccccaacccccccccccccccccaaaaaacccccccccccccccccccccccccccaaaccccciiinnnoooojjjjjjkkkaaaaaaacccc
abcaaaaaaaaccccccccccccccccccccccccccccccccccccaaaccaaaaaaccccaaacccccccccaaaacccccccccccccccccccccccccccccaaaaccciiinnnouooojjjjkkkkkaaaaaccccc
abccaccccccccccccccccccaaccccccaccccccccccccaaaaaaaaaaaaaacccaaaacccccccccaaaacccccccccccccccccccccccccccaaaaaacchhinnnttuuooooookkkkkkkaaaccccc
abccccccccccccccccccaacaaaccccaaaaaaaaccccccaaaaaaaacaaaaacccaaaacccccccccaccacccccccccccccccccccccccccccaaaaacchhhhnntttuuuooooppppkkkkcaaacccc
abccccccccaaacccccccaaaaaccccccaaaaaaccccccccaaaaaacaaaaaccccaaaaccccccccccccccccccccccccccccaccccccccccccaaaaahhhhnnntttxuuuooppppppkkkcccccccc
abccccccccaaaacccccccaaaaaaccccaaaaaaccaaacccaaaaaacaaaaaccccccccccccccaaccccccccccccccaaaaaaaacccccccccccaachhhhhnnnntttxxuuuuuuuupppkkkccccccc
abccccccccaaaacccccaaaaaaaacccaaaaaaaacaaacacaaaaaaccccccccccccccccccccaacccccccccccccccaaaaaacccccccccccccchhhhmnnnntttxxxxuuuuuuupppkkcccccccc
abacccccccaaaacccccaaaaacaaccaaaaaaaaaaaaaaaaaaccaacccccccccccccccccaaaaaaaaccccccccccccaaaaaaccccccccccccchhhhmmmntttttxxxxuyyyuvvpppklcccccccc
abacccccccccccccccccacaaaccaaaaaaaaaaaaaaaaaaaccccccccccccccccccccccaaaaaaaacccccccccccaaaaaaaaccccccccccccgghmmmtttttxxxxxxyyyyvvvpplllcccccccc
abaccccccccaacccccccccaaaccaaaaaaaacaaaaaaaaaaccccccccccccccccccccccccaaaaccccccccccccaaaaaaaaaaccccccaccccgggmmmtttxxxxxxxyyyyyvvppplllcccccccc
SbaaaccccccaaacaaaccccccccaaaaaaaaacaaaaaaaaacccccccccccccccccccccccccaaaaacccccccccccaaaaaaaaaaaaacaaaccaagggmmmtttxxxEzzzzyyyvvppplllccccccccc
abaacccccccaaaaaaacccccccaaaaaaacaaccaaaaaaaccccccccccccccaaaccccccccaaaaaacccccccccccacacaaacccaaaaaaacaaagggmmmsssxxxxxyyyyyvvvqqqlllccccccccc
abaccccccccaaaaaaccacccaaaaaaaaacccccccaaaaaaccccccccccccaaaaccccccccaaccaacccccccccccccccaaaccccaaaaaaccaagggmmmssssxxwwyyyyyyvvqqqlllccccccccc
abaccccccaaaaaaaaccaacaaaccaaaaaacccccaaaaaaaccccccccccccaaaaccccccccccaacccccccccccccccccaacccccaaaaaaaaaaggggmmmssssswwyywyyyyvvqqlllccccccccc
abaccccccaaaaaaaaacaaaaacccaaaaaacccccaaacaaaccccccccccccaaaaccccccccaaaaaaccccccccccccaacccccccaaaaaaaaaaaaggggmmmossswwyywwyyvvvqqqllccccccccc
abcccccccaaaaaaaaaacaaaaaacaaccccccccaaacccccccccccccccccccccccccccccaaaaaaccccccccccccaaaaacccaaaaaaaaaaaaaaggggoooosswwywwwwvvvvqqqmlccccccccc
abccccccccccaaacaaaaaaaaaacccccccccccaaacaccccccccccccccccccccccccccccaaaaccccccccccccaaaaaccccaaacaaacccaaacagggfooosswwwwwrvvvvqqqqmmccccccccc
abccccccccccaaacccaaaaaaaacccccccccaacaaaaacccccccccccccccccccccccccccaaaaccccccccccccaaaaaacccccccaaacccaaccccfffooosswwwwrrrrrqqqqqmmccccccccc
abccccccccccaacccccccaaccccccccccccaaaaaaaacccccccccccccaaccccccccccccaccaccccccccccccccaaaacccccccaacccccccccccfffoossrwrrrrrrrqqqqmmmccccccccc
abccaaaccccccccccccccaacccccccccccccaaaaaccccccccccccaacaacccccccaaaaacccccccccccccccccaacccccccccccccccccccccccfffoossrrrrrnnnmqqmmmmmccccccccc
abcaaaaccccccccccccccccccccccccccccccaaaaacccccccccccaaaaacccccccaaaaacccaaaccccccccccccccccccccccccccccccccccccfffooorrrrrnnnnmmmmmmmccccaacccc
abcaaaacccccccccccccccccccccccccccccaaacaaccccacccccccaaaaaaccccaaaaaaccccaaaccacccccccccccccccccccccccccccccccccffoooonnnnnnnnmmmmmmccccaaacccc
abccaaacccccccccccccccccccccaaaaaccccaaccccaaaacccccaaaaaaaaccccaaaaaaccccaaaaaaaccccccccccccccccaccaccccccccccccfffooonnnnnnddddddddcccaaaccccc
abccccccccccccccccccccccccccaaaaaccccccccccaaaaaacccaaaaacaacccaaaaaaaccaaaaaaaacccccccccccccccccaaaaccccccccccccfffeonnnnneddddddddddcaaacccccc
abccccccccccaaaccccccccccccaaaaaacccccccccccaaaacccccacaaacccccaacaacccaaaaaaaaacccccccccccccccccaaaacccccccccccccffeeeeeeeeddddddddcccaaacccccc
abcccccccccaaaaccccacccccccaaaaaaccccccccccaaaaacccccccaaaacccaaacaccccaaaaaaaaaccccccccccccccccaaaaaaccccccccccccceeeeeeeeedacccccccccccccccccc
abaccccccccaaaaccccaaacaaacaaaaaaccccccccccaacaaccccccccaaaacaaaacaaacaaaaaaaaaacccccccccccccaacaaaaaacccccccccccccceeeeeeeaaacccccccccccccccaaa
abaaacccccccaaaccccaaaaaaaccaaaccccccccaaacccccccccccccccaaaaaaaacaaaaaaaaaaaaaaacacaaccaaacaaacccaacccccccccccccccccaacccaaaacccccccccccccccaaa
abaaaccccccccccccccaaaaaaccccccccccccccaaacccccccccccccccaaaaaaaccaaaaaaccaacccaccaaaaccaaaaaaaccccccccaaccccccccccccccccccaaacccccccccccccccaaa
abaaccccccccccccccaaaaaaacccccccccccaaaaaaaaccccccccccccccaaaaaaaaaaaaaacaaaccccccaaaaaccaaaaaaccccccaaaaccccccccccccccccccaaaccccccccccccaaaaaa
abaaaccccccccccccaaaaaaaaaacccccccccaaaaaaaacccccccccccaaaaaaaaaaaaaaaaaaacccccccaaaaaacaaaaaaaaaccccaaaaaacccccccccccccccccccccccccccccccaaaaaa`;

let start = {};
let end = {};
let starts = [];

const map = {};

const parseInput = (input) => {
    let rows = input.split('\n');
    console.log(`map size: ${rows[0].length} x ${rows.length}`);
    // convert map to number grid
    for (let y = 0; y < rows.length; y++) {
        map[y] = {};
        let arr = Array.from(rows[y]);

        for (let x = 0; x < arr.length; x++) {
            let ch = arr[x];
            let cell = {
                x, y,
                height: (ch == 'S' ? 'a' : ch == 'E' ? 'z' : ch).charCodeAt(0) - 96,
                moves: [],
            };

            if (ch == 'S') {
                start = { x, y, moves: [] };
            }
            if (ch == 'E') {
                end = { x, y, moves: [] };
            }

            if (cell.height == 1)
                starts.push(cell);

            map[y][x] = cell;
        }
    }
    // find viable neighbours
    for (let y = 0; y < rows.length; y++) {
        let arr = Array.from(rows[y]);

        for (let x = 0; x < arr.length; x++) {
            // N
            if (y - 1 >= 0 && map[y - 1][x].height <= map[y][x].height + 1)
                map[y][x].moves.push({ x, y: y - 1, move: 'n' });
            // S
            if (y + 1 < rows.length && map[y + 1][x].height <= map[y][x].height + 1)
                map[y][x].moves.push({ x, y: y + 1, move: 's' });
            // E
            if (x + 1 < arr.length && map[y][x + 1].height <= map[y][x].height + 1)
                map[y][x].moves.push({ x: x + 1, y, move: 'e' });
            // W
            if (x - 1 >= 0 && map[y][x - 1].height <= map[y][x].height + 1)
                map[y][x].moves.push({ x: x - 1, y, move: 'w' });

        };
    }
    //console.log(map);
};


const toDir = (d) => {
    switch (d) {
        case 'n': return '^';
        case 'e': return '>';
        case 's': return 'V';
        case 'w': return '<';
    }
};

const toDir2 = (d1, d2) => {
    let cb = d2 + d1;
    //console.log(cb);
    //'└', '┘', '┌', '┐', '│', '─';
    switch (cb) {
        case 'nn':
        case 'ss': return '│';
        case 'ne':
        case 'ws': return '┌';
        case 'nw':
        case 'es': return '┐';
        case 'ee':
        case 'ww': return '─';
        case 'se':
        case 'wn':
            return '└';
        case 'sw':
        case 'en': return '┘';
    }


};

const isInList = (pos, list) => list.filter(p => p.x == pos.x && p.y == pos.y).length;

const printPath = (path) => {
    let msg = '\npath:\n';
    let cds = path.map(p => { return { x: p[0].split(',')[0], y: p[0].split(',')[1], m: p[1] }; });
    //console.log(cds);
    for (let i = 0; i < cds.length - 1; i++) {
        cds[i].m = toDir2(cds[i].m, cds[i + 1].m);
    }

    //console.log('cds', cds);
    for (let col in map) {
        for (let row in map[col]) {
            let mv = cds.filter(c => c.x == row && c.y == col);
            //console.log('mv', mv);
            if (start.x == row && start.y == col) msg += 'O';
            else if (end.x == row && end.y == col) msg += 'X';
            else if (mv.length) msg += mv[0].m;
            else if (col == 0 || col == Object.keys(map).length - 1 || row == 0 || row == Object.keys(map[0]).length - 1) msg += ' ';
            else msg += ' ';
        }
        msg += '\n';
    }
    console.log(msg + `(${path.length} moves)`);
};

const getTile = pos => map[pos.y][pos.x];
const toC = (pos) => pos.x + ',' + pos.y;

const bfs = () => {
    let q = [getTile(start)];
    let visited = {};
    visited[toC(start)] = true;
    let parent = {};
    parent[toC(start)] = null;

    while (q.length) {
        let curr = q.shift();
        //console.log('visiting', curr, ' --- total moves possible: ', curr.moves?.length ?? 0);

        //visited.push(curr);
        if (curr.x == end.x && curr.y == end.y) {
            break;
        }

        for (let target of curr.moves) {
            //console.log('looking at', target);
            if (!visited[toC(target)]) {
                visited[toC(target)] = true;
                q.push(getTile(target));
                parent[toC(target)] = {
                    p: toC(curr),
                    m: target.move
                };
            }

        }
    }


    let path = [];
    //console.log('parent', parent);
    let e = toC(end);
    while (parent[e]) {
        path.push([parent[e].p, parent[e].m]);
        e = parent[e].p;
    }
    //console.log(path.reverse());
    //console.log(path.length, 'steps');
    return path;
};


(() => {
    exec(() => {
        parseInput(rawinput);
        //console.log(map);

        let path = bfs();
        printPath(path);
        console.log(path.length);
        let p2paths = [];
        for (let st of starts) {
            start = st;
            let path = bfs();
            if (path.length == 0) continue;
            //console.log(path.length);
            p2paths.push(path);
        }

        let bestPath = p2paths.sort((a, b) => a.length - b.length)[0];
        printPath(bestPath);
        console.log(p2paths.sort((a, b) => a.length - b.length)[0].length);
    });
})();