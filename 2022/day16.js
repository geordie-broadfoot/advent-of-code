import { exec } from './base.js';

const rawinput = `Valve EF has flow rate=22; tunnels lead to valves FK, HT, DE
Valve WT has flow rate=0; tunnels lead to valves XJ, XR
Valve RQ has flow rate=0; tunnels lead to valves VG, AV
Valve HF has flow rate=17; tunnels lead to valves EO, PQ, GX
Valve ZH has flow rate=0; tunnels lead to valves VG, RU
Valve AV has flow rate=0; tunnels lead to valves RQ, VQ
Valve AH has flow rate=12; tunnels lead to valves DF, FC, DE, MV, YC
Valve PQ has flow rate=0; tunnels lead to valves CF, HF
Valve DP has flow rate=18; tunnels lead to valves RD, OP, DR
Valve RU has flow rate=16; tunnels lead to valves ZH, VJ, AQ, SG
Valve AQ has flow rate=0; tunnels lead to valves RU, WE
Valve KO has flow rate=0; tunnels lead to valves VQ, HQ
Valve EY has flow rate=0; tunnels lead to valves WE, VQ
Valve RC has flow rate=14; tunnels lead to valves QK, BL, EO
Valve AA has flow rate=0; tunnels lead to valves XV, MS, BG, RT, HQ
Valve IH has flow rate=0; tunnels lead to valves VQ, VJ
Valve CK has flow rate=0; tunnels lead to valves SG, KG
Valve BG has flow rate=0; tunnels lead to valves DY, AA
Valve UJ has flow rate=0; tunnels lead to valves AF, OY
Valve HQ has flow rate=0; tunnels lead to valves AA, KO
Valve XV has flow rate=0; tunnels lead to valves AA, YL
Valve BL has flow rate=0; tunnels lead to valves DY, RC
Valve YL has flow rate=0; tunnels lead to valves WE, XV
Valve RT has flow rate=0; tunnels lead to valves VG, AA
Valve MV has flow rate=0; tunnels lead to valves AH, OM
Valve WE has flow rate=5; tunnels lead to valves AQ, YL, OM, ZU, EY
Valve HN has flow rate=0; tunnels lead to valves OP, XJ
Valve UR has flow rate=0; tunnels lead to valves NZ, OY
Valve FK has flow rate=0; tunnels lead to valves OY, EF
Valve GE has flow rate=0; tunnels lead to valves DF, XE
Valve GX has flow rate=0; tunnels lead to valves HF, DY
Valve YC has flow rate=0; tunnels lead to valves QC, AH
Valve XR has flow rate=0; tunnels lead to valves DY, WT
Valve MS has flow rate=0; tunnels lead to valves AA, DR
Valve EO has flow rate=0; tunnels lead to valves HF, RC
Valve VQ has flow rate=9; tunnels lead to valves NZ, KO, EY, AV, IH
Valve DY has flow rate=23; tunnels lead to valves XR, GX, BL, BG
Valve XJ has flow rate=24; tunnels lead to valves QK, HN, WT
Valve RD has flow rate=0; tunnels lead to valves VG, DP
Valve ZU has flow rate=0; tunnels lead to valves VG, WE
Valve AF has flow rate=0; tunnels lead to valves KG, UJ
Valve DR has flow rate=0; tunnels lead to valves MS, DP
Valve NZ has flow rate=0; tunnels lead to valves VQ, UR
Valve DE has flow rate=0; tunnels lead to valves EF, AH
Valve OP has flow rate=0; tunnels lead to valves DP, HN
Valve QK has flow rate=0; tunnels lead to valves XJ, RC
Valve CF has flow rate=20; tunnel leads to valve PQ
Valve FC has flow rate=0; tunnels lead to valves KH, AH
Valve KG has flow rate=25; tunnels lead to valves HT, AF, KH, CK
Valve XE has flow rate=11; tunnel leads to valve GE
Valve OY has flow rate=7; tunnels lead to valves FK, UJ, UR, QC
Valve OM has flow rate=0; tunnels lead to valves MV, WE
Valve QC has flow rate=0; tunnels lead to valves YC, OY
Valve DF has flow rate=0; tunnels lead to valves AH, GE
Valve KH has flow rate=0; tunnels lead to valves KG, FC
Valve SG has flow rate=0; tunnels lead to valves CK, RU
Valve VG has flow rate=3; tunnels lead to valves ZH, ZU, RQ, RD, RT
Valve HT has flow rate=0; tunnels lead to valves KG, EF
Valve VJ has flow rate=0; tunnels lead to valves IH, RU`;

const testinput = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`;

// (x == open valve)
// Test path: A -> Dx -> C -> Bx -> A -> I -> Jx -> I -> A -> D -> E -> F -> G -> Hx -> G -> F -> Ex -> D -> Cx

// Valve opening order: D, B, J, H, E, C


let testing = false;
let result = 0;
(() => {
    exec(() => {


        let input = parseInput(testing ? testinput : rawinput);
        // part 1
        //console.log(input);

        let pos = 'AA';

        findNextMove({ pos, input, flowRate: 0, output: 0, time: 30 });

        console.log('total output achieved:', result);
    });
})();

function findNextMove(state) {

    let {
        pos,
        time,
        output,
        flowRate,
        input,
    } = state;
    let closedValves = Object.values(input).filter(v => !v.open).map(v => {
        return {
            ...v,
            timeToOpen: getShortestPath(input, pos, v.pos).length + 1
        };
    }).filter(v => v.timeToOpen < time);

    // for (let v of Object.values(input)) {
    //     if (!v.open) closedValves.push(v);
    // }

    if (!closedValves.length) {
        //console.log(`opened all valves with ${time} turns left`);
        if (time > 0) {
            output += flowRate * time;
        }
        if (output > result) result = output;
        return;
    }

    for (let i = 0; i < closedValves.length; i++) {
        let v = closedValves[i];

        // move to and open valve
        let newTime = time - v.timeToOpen; // time to open
        let newPos = v.pos;
        let newOutput = output + (flowRate * v.timeToOpen);
        let newInput = JSON.parse(JSON.stringify(input));
        newInput[v.pos].open = true;
        let newFlowRate = flowRate + input[v.pos].rate;

        findNextMove({
            pos: newPos, time: newTime, input: newInput, output: newOutput, flowRate: newFlowRate
        });

    }
}

function getShortestPath(input, pos, target) {
    // simple BFS to find shortest path
    let queue = [pos];
    let visited = { pos: true };
    let parent = { pos: null };

    while (queue.length) {
        let current = queue.shift();

        if (current == target) {
            break;
        }
        for (let t of input[current].links) {
            if (!visited[t]) {
                visited[t] = true;
                queue.push(t);
                parent[t] = current;
            }
        }
    }

    let path = [target];
    let e = target;
    while (parent[e]) {
        if (parent[e] == pos) break;
        path.push(parent[e]);
        e = parent[e];
    }
    return path.reverse();
}


function potentialOutput(valve, time) {
    //console.log(valve);
    return valve.rate * time;
}

function parseInput(input) {
    let rows = input.split('\n');
    let result = {};

    rows.forEach(n => {
        let [, valve, , , r, , , , , ...targets] = n.split(' ');

        let rate = parseInt(r.split('=')[1].slice(0, -1));

        result[valve] = {
            pos: valve,
            reserved: false,
            open: rate == 0, // count 0-flow valves as open
            rate: rate,
            links: targets.map(t => t.replace(',', ''))
        };
    });

    return result;
};