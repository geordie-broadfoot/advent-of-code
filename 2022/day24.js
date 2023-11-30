import { deepClone, exec, pause } from './base.js';

const rawinput = `#.########################################################################################################################
#><..<.<<^v><<^>>>^^^<v<>..^<<^<<^^<.<vv><vv<v^>.<>^<v>.<>^v>>>v^><.>.<<>>>^v<>vv<vv>^v^vvv>vv<<v><^<>>^^<><^^><.^v>.^>.<#
#>>v<vv<<<<<v<^><<>v.^>^<<<.<^.<<^<.^v^<^^>v<v>v^<v^^v<><>^>>><<^v^^<<v>v^><...^<<<><>>^v>^>><^<<.^v^>v>>>^><vv>^v^.^v><<#
#>^^<>^<<<v>^>vv.>^.^<vv^vvv>vv<.^>><v<^>.v..^^^^.>.<<>.<vv.^v^>^^>^.>^.^^^..>>><^<^>><^<<<><v><.^v<^v.>^<v^^.<^>>>>v.^v<#
#.>v<<<.vv^v><vv^.<.<<<vvv^.<^^v^<v>^v<.<^^>^.v>>v.<>v<>.<v<^<^v.>^.v^v>^<>>>>vv>v<><<<<><>>><vv<v>><<.v^>.v^vv^>^v<><<^>#
#<v>^<<v>v^>v<<><^vvv<<^.>v<v^>vv^>.vv^<^><<<<><v^><^..v>vv<^>>^>.v^<vv^^^.^^v>>..v>>.<^v^>.>>>>>v..^<<^<<vv^^>.v<v<>v<<>#
#<>>v>^<.^^^^<<v<<>><<^^>^^.^^^^v<^^<><v>>.>vv^^v>v>v<v^^^>v^vv<<vv>.<vv>^.>v<v<<<v^^.v<<<<v^<^^.^v<vvv^><<>^>^><v<^vv.^<#
#<>^vv^>>v>v<^>^<^.^.^<.v>v.^<<<<v><>v.<<<..>.<>>^.^vv^v<^^v.vv<>>vvvv>.^<v^<<<v>^^vv<^v^v<.><v>^.<v^<^>^v<^vv><><<^^.<>.#
#.<><>^^<^v^^>v<><><>^.<^<<.<^vvv^^.<.^.^<.^^><<.>><>>>>^^<>v>..v<v>>^>vv.>v^>>v.>^..<>..vv>^<vv>>><^.vv^><>^^^^vvv^v^^<<#
#<^>.<^^<^v<><v.<>^<^.>>>>^<.>vv^.v^<>v>^<<v<<<v.^v>vvvv<>^<<<<.v.v><<.^v^<v>.<^<<^<v<<<^><v<v>>>^<^^<^^^^vv<v<^>^<vv>v^<#
#><v>.>.v><<^>v^><.^<<>^v>>.<^^^<<<><<<^<^^v<.>^vv.>^vvv^v<<v>vv<<.^v^vv>.v^v><v<v.^.<.vv>^>>^>>^v^^^.><^v<v^<v>><>.>v^<<#
#>>>>vv><^<vv>>^<v.><>><^^<v^>^^<vv>><v>>><>>vvv<^.<^v>^.<<v.<..^v^^<v<v^>vv^<^.^^^<.^vv..<<>><^<v<^>^^^<^^v^>^>>v><><<.<#
#>v>><>.v>^><<^.>>>vvv^<.v<>vv^<^^<<vv<>v^<.^v>.v>^<v<<vv<^vv<.<>>^.v^.>><..<v^^>^^^^<>^^.^.>vv^<v^^.vv..<^^v<vv.^<^^v.>>#
#<>^^vvvv^><>^vv<><.<<<>^.<.v^<<vv^v^vvvv<>>v<^^v>^^v>^>^v<<.>.<>.^v.<^<<.^v^^><v<<^v<^><><^>>>.<<<v..v><>^vvv<^.<v<.>><.#
#<<^<>v>v^v<v^v^^^>.v>..^^<>vv<<^v>^<.^^.vv<.<.<<<<vv><><..>v><>>>v.v<^^>v>>^<v.<<.>v<^<^^>v>>>v^>^v><><<^<^.vvvv>>^>^..>#
#<><>^^.<<v<^v>^^.^v.v<>^^vvv<<<<^>^<><.vv<v^<v.^.v^vv^<.^^^<>v.^<.>^>.>.^<<<<<^^<^.^.^>.^>.>>vvv<.<v<.vv><>^><>><^<>.<^<#
#<<vv^^^<>^^^<vv<vv^<^v.>v<>>>vvv><^<<<>^^^.<<.vv><><^<<v>>>^><..<v.v>>^<<>>>>^>v^.>.><v>>^^vv<>v.^^vv<>>^<^>v>vv><<>><^>#
#>v.<<><^<>.>><>><.^^v>^^v^>>vv>vv>>><^...^vv^v^.>vv..<vv<<<^^^><^<v.><>v.v^^^^v>^^<^<<^v>^>.v^>.<^<<>^^.<<<>^<v.^v^.><^>#
#><^^>>^<>^<>>vv>^.^vvv^<vv><>^^^<<v^^>v<^>v<<^v^><^v<>v^.^><>v<^vv>v<>v<><>^>>.<^>^>.<vv<>>^.<^<^vvv.v<v<v>^v^^>.>v>.^<>#
#<<<<v....>^><>v^>v>.<.>v<^<v<<^^>>>^^vv<^vv^^^<<<<>><<^<<^v>v.>..v>v<>vv.>v<v>^^^v<^^^vvvvv^<.>vv^^.vv>v<.^^<<<<v^<>^v^>#
#<<<vvv^^.<v^^<.vv^>v^<<v<<v.<^<<^>^<v<<>.^>.><v^>>^^^v<v.<^v>^<>>.^^><^<<.>v^v>.<>.^vv.^>^v.^^^^.<.vv^vv<vv^<<<^><vvv><<#
#.vv>^.vv<<<<.<vv^.^^>v.><v^^v<<>v><.<v^><v<vv^v<><<<>.>v^^.^^<v>>^<^v^^<^^v<>^^v>><>.><^<^^>>v<<vv<v>^^^^><><vv<>><<<>^<#
#>vv^>.^<><<..<v^vv>>^<><.v^<^>^><v>v.v^^<<>>v<vv><^v>.<<vv>v^.<<v^^^^v^<.>.>v.>>v..<>><v.^^<v<^v>v^^v^<<^>>>v>>^v<^<>.<.#
#>v^<^.v^>><<><^<v<^^<v>^^..><<>vv^^><vv><<<.><.<^.<<<>v<.>vv<<v^.^v^.<v.vv>>>^v>.^>.^><^^vv<>v<v>>><^>^^^vvv^v.v>v<<<>v<#
#>^v<>.>.><^>>vv.>v^><>><<>v^^v>^^vv>v>^.<<v<.v<^<<^^v<vvv<^^>^^<>^>^v^vv.><<^>.<>^>v<^<.>>vvv>>>v^<>vv.<>v>^^>vv^>>vv<v<#
#<v>vv.vv^>>v^v<<>^<v^<<<<^<.^vvv<v^^>><<<<>v>^<v<<<v>><^<..>.v^>>vv^>>>>v.v.>^^^<v<^>^^<^<^<><v>^>>>>..^vv>.^<>v^>>v>.><#
########################################################################################################################.#`;
const testinput = `#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`;


const testing = false;
let bestScore = 999999;

(() => {
    exec(() => {
        let state = parseInput(testing ? testinput : rawinput);
        printState(state);

        findGoal(state);

    });
})();


function findGoal(oState, step = 0) {
    //console.log('step', step);
    // Update blizzards
    let state = moveBlizzards(oState);

    //    printState(state, step);
    pause(0);


    if (state.pos.x == state.goal.x && state.pos.y == state.goal.y) {
        if (step < bestScore) bestScore = step;
        console.log('found goal in', step, 'steps. (best is', bestScore + ')');
        return;
    }
    // No use trying a longer path
    if (step >= bestScore) return;

    // Then find possible moves
    [
        getTile(state, state.pos.x - 1, state.pos.y), // <
        getTile(state, state.pos.x + 1, state.pos.y), // >
        getTile(state, state.pos.x, state.pos.y - 1), // ^
        getTile(state, state.pos.x, state.pos.y + 1), // v
        getTile(state, state.pos.x, state.pos.y),     // .
    ]
        // Find valid moves
        .filter(tile => {
            return tile != null
                && !tile.wall
                && tile.blizzards.length == 0;
            // && !(tile.x == state.start.x
            //     && tile.y == state.start.y);
        })
        // Recursively try each one
        .forEach(tile => {
            state.pos = {
                x: tile.x,
                y: tile.y
            };
            findGoal(state, step + 1);
        });

    //console.log('possible moves:', moves);
}


function moveBlizzards(state) {
    let newMap = {};

    // Copy map without blizzards
    forEachTile(state, p => {
        if (!newMap[p.y]) newMap[p.y] = {};
        newMap[p.y][p.x] = {
            ...deepClone(p),
            blizzards: []
        };
    });

    // Move blizzards into their new positions in new map
    forEachTile(state, p => {
        p.blizzards.forEach(b => {

            // console.log(`moving blizzard ${b.id}:`);
            // console.log(`pos: ${b.pos.x},${b.pos.y} - moving ${b.dir.x},${b.dir.y}`);

            b.pos.x += b.dir.x;
            b.pos.y += b.dir.y;

            if (b.pos.x == 0) b.pos.x = state.dimensions.max.x - 1;
            else if (b.pos.x == state.dimensions.max.x) b.pos.x = 1;

            if (b.pos.y == 0) b.pos.y = state.dimensions.max.y - 1;
            else if (b.pos.y == state.dimensions.max.y) b.pos.y = 1;

            // console.log(`tgt: ${b.pos.x},${b.pos.y}`);
            // pause(0.5);


            newMap[b.pos.y][b.pos.x].blizzards.push(b);

        });
    });

    let newState = deepClone(state);
    newState.map = newMap;
    return newState;
}

function forEachTile(state, cb) {
    for (let y = 0; y <= state.dimensions.max.y; y++)
        for (let x = 0; x <= state.dimensions.max.x; x++)
            cb(state.map[y][x]);
}

function getTile(state, x, y) {
    if (!state.map[y]) return null;
    if (!state.map[y][x]) return null;
    return state.map[y][x];
}

function printState(state, minute) {

    let msg = '       MAP:\n\t';
    forEachTile(state, (p, x, y) => {
        if (p.wall) msg += '#';
        else if (state.pos.x == p.x && state.pos.y == p.y) msg += 'E';
        else if (p.blizzards.length == 0) msg += '.';
        else if (p.blizzards.length == 1) msg += p.blizzards[0].sym;
        else msg += p.blizzards.length;

        if (p.x == state.dimensions.max.x)
            msg += '\n\t';
    });
    console.log(msg);
    console.log(`  Map dimensions: ${state.dimensions.max.x} x ${state.dimensions.max.y}`);
    console.log(`  Current pos: ${state.pos.x},${state.pos.y}`);
    console.log(`  Goal:        ${state.goal.x},${state.goal.y}`);
    if (minute)
        console.log('Minute: ', minute);

}

function parseInput(input) {
    let rows = input.split('\n');

    let output = {
        dimensions: {
            min: { x: 0, y: 0 },
            max: { x: rows[0].length - 1, y: rows.length - 1 },
        },
        pos: { x: 1, y: 0 },
        start: { x: 1, y: 0 },
        goal: { x: rows[0].length - 2, y: rows.length - 1 }
    };
    let map = {};

    let blizzCt = 1;

    rows.forEach((row, y) => {
        if (!map[y]) map[y] = {};

        for (let x = 0; x < row.length; x++) {
            let p = row.charAt(x);
            let isWall = false;
            let blizzard = [];
            if (p == '#') isWall = true;
            else if (p != '.')
                blizzard.push({
                    id: blizzCt++,
                    pos: {
                        x,
                        y,
                    },
                    dir: {
                        y: p == '^' ? -1 : p == 'v' ? 1 : 0,
                        x: p == '<' ? -1 : p == '>' ? 1 : 0
                    },
                    sym: p
                });

            map[y][x] = {
                y,
                x,
                wall: isWall,
                blizzards: blizzard,
            };
        }
    });

    output['map'] = map;

    return output;


};;