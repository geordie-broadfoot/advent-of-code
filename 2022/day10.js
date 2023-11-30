import { exec } from "./base.js";

const testinput = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

const rawinput = `addx 1
addx 4
noop
noop
noop
noop
addx 6
addx -1
noop
addx 5
noop
addx 5
noop
noop
noop
addx 1
addx 3
addx 1
addx 6
addx -1
noop
noop
noop
addx 7
noop
addx -39
noop
noop
noop
addx 7
addx 3
addx -2
addx 2
noop
addx 3
addx 2
addx 5
addx 2
addx -8
addx 13
noop
addx 3
addx -2
addx 2
addx 5
addx -31
addx 36
addx -2
addx -36
noop
noop
noop
addx 3
addx 5
addx 2
addx -7
addx 15
addx -5
addx 5
addx 2
addx 1
addx 4
noop
addx 3
noop
addx 2
addx -13
addx -16
addx 2
addx 35
addx -40
noop
noop
addx 7
noop
noop
noop
addx 5
noop
addx 5
addx 10
addx -10
noop
noop
noop
addx 3
noop
addx 16
addx -9
noop
noop
noop
addx 3
noop
addx 7
addx -32
addx 35
addx -38
addx 22
addx 10
addx -29
addx 2
noop
addx 3
addx 5
addx 2
addx 2
addx -12
addx 13
noop
noop
addx 7
addx 5
noop
noop
noop
addx 7
addx -6
addx 2
addx 5
addx -38
addx 1
noop
noop
addx 2
noop
addx 3
addx 5
noop
addx 4
addx -2
addx 5
addx 2
addx 1
noop
addx 4
addx 4
addx -14
addx 16
noop
addx -13
addx 18
addx -1
noop
noop
noop`;

const targetCycles = [20, 60, 100, 140, 180, 220];
let output = 0;
let state = {
    cycle: 1,
    x: 1
};

const crtOutput = [];

const getCrtOutput = (cycle, pos) => {
    let crtPos = cycle;

    while (crtPos > 40) crtPos -= 40;

    if (crtPos == 1) {
        crtOutput.push([]);
    }
    let row = crtOutput.pop();

    let isVisible = crtPos >= pos && crtPos <= pos + 2;
    if (isVisible) row.push('█');
    else row.push(' ');

    crtOutput.push(row);
};

const nextCycle = (val = 0) => {
    getCrtOutput(state.cycle, state.x);
    state.cycle++;
    state.x += parseInt(val);
    if (targetCycles.includes(state.cycle)) {
        // console.log('cycle', state.cycle, ':', state.x, state.x * state.cycle);
        output += (state.x * state.cycle);
    }

};


const processCommands = (input) => {
    input.forEach(i => {
        let [cmd, val = 0] = i.split(' ');
        nextCycle();

        if (cmd == 'addx') {
            nextCycle(val);
        }
    });
};


(() => {
    exec(() => {

        const cmds = rawinput.split('\n');

        processCommands(cmds);
        //console.log(state.cycle);
        console.log(output);
        crtOutput.forEach(r => console.log(r.toString().replace(/,/g, '')));
    });
})();