import { exec } from "./base.js";

const rawinput = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 14 clay. Each geode robot costs 3 ore and 16 obsidian.
Blueprint 2: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 5 clay. Each geode robot costs 2 ore and 10 obsidian.
Blueprint 3: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 20 clay. Each geode robot costs 2 ore and 12 obsidian.
Blueprint 4: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 6 clay. Each geode robot costs 2 ore and 20 obsidian.
Blueprint 5: Each ore robot costs 2 ore. Each clay robot costs 2 ore. Each obsidian robot costs 2 ore and 20 clay. Each geode robot costs 2 ore and 14 obsidian.
Blueprint 6: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 14 clay. Each geode robot costs 4 ore and 19 obsidian.
Blueprint 7: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 17 clay. Each geode robot costs 3 ore and 7 obsidian.
Blueprint 8: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 13 clay. Each geode robot costs 3 ore and 11 obsidian.
Blueprint 9: Each ore robot costs 2 ore. Each clay robot costs 2 ore. Each obsidian robot costs 2 ore and 17 clay. Each geode robot costs 2 ore and 10 obsidian.
Blueprint 10: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 19 clay. Each geode robot costs 4 ore and 13 obsidian.
Blueprint 11: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 10 clay. Each geode robot costs 4 ore and 10 obsidian.
Blueprint 12: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 17 clay. Each geode robot costs 4 ore and 20 obsidian.
Blueprint 13: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 17 clay. Each geode robot costs 3 ore and 11 obsidian.
Blueprint 14: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 20 clay. Each geode robot costs 2 ore and 17 obsidian.
Blueprint 15: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 4 ore and 19 clay. Each geode robot costs 4 ore and 12 obsidian.
Blueprint 16: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 18 clay. Each geode robot costs 4 ore and 19 obsidian.
Blueprint 17: Each ore robot costs 2 ore. Each clay robot costs 2 ore. Each obsidian robot costs 2 ore and 8 clay. Each geode robot costs 2 ore and 14 obsidian.
Blueprint 18: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 19: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 14 clay. Each geode robot costs 4 ore and 15 obsidian.
Blueprint 20: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 14 clay. Each geode robot costs 4 ore and 10 obsidian.
Blueprint 21: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 7 clay. Each geode robot costs 2 ore and 16 obsidian.
Blueprint 22: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 19 clay. Each geode robot costs 3 ore and 19 obsidian.
Blueprint 23: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 20 clay. Each geode robot costs 2 ore and 16 obsidian.
Blueprint 24: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 19 clay. Each geode robot costs 2 ore and 18 obsidian.
Blueprint 25: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 17 clay. Each geode robot costs 4 ore and 8 obsidian.
Blueprint 26: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 20 clay. Each geode robot costs 4 ore and 16 obsidian.
Blueprint 27: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 20 clay. Each geode robot costs 2 ore and 10 obsidian.
Blueprint 28: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 10 clay. Each geode robot costs 3 ore and 10 obsidian.
Blueprint 29: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 9 clay. Each geode robot costs 3 ore and 15 obsidian.
Blueprint 30: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 19 clay. Each geode robot costs 3 ore and 8 obsidian.`;
const testinput = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`;

let highscore = 0;
let iterations = 0;

let testing = true;

(() => {
    exec(() => {
        let input = parseInput(testing ? testinput : rawinput);
        console.log(input);
        console.log('part 1:', part1(input), testing && '(expected )');
    });
})();


function part1(input) {
    let result = '';


    input.reverse().forEach(i => {

        let state = {
            blueprint: i,
            robots: {
                ore: 1,
                clay: 0,
                obsidian: 0,
                geode: 0
            },
            resources: {
                ore: 0,
                clay: 0,
                obsidian: 0,
                geode: 0,
            },
            time: 24
        };

        calculateQuality(state);
        i.quality = highscore;
        highscore = 0;
        iterations = 0;

        console.log('blueprint', i.id, 'quality =', i.quality, state);
        for (let n = 0; n < 10000000000000; n++);
    });



    return result;
}

function cloneState(oState) {
    return {
        ...oState,
        resources: { ...oState.resources },
        robots: { ...oState.robots },
        blueprint: { ...oState.blueprint }
    };
}

function calculateQuality(oState, depth = 1) {
    let res = ['geode', 'obsidian', 'clay', 'ore'].reverse();

    if (oState.time == 0) {

        if (oState.resources.geode > highscore) {
            highscore = oState.resources.geode;
            console.log('found new highscore', oState.blueprint.id, highscore, iterations);
        }
        return;

    }
    iterations++;
    //iterations % 1000000 == 0 && console.log('turn', depth, 'highscore', highscore, 'iterations', iterations);
    let currentState = cloneState(oState);
    currentState.time--;


    // Find possible actions
    let actions = [...res.filter(r => canBuild(r, currentState)), 'nothing'];
    // console.log('Turn', turn, 'actions', actions);
    // Increment resources
    res.forEach(r => currentState.resources[r] += currentState.robots[r]);

    // Recursively try each one
    for (let a of actions) {
        let state = cloneState(currentState);
        if (a != 'nothing') {
            build(a, state);
        }
        calculateQuality(state, depth + 1);

    }

}

function canBuild(type, state) {
    let neededRes = state.blueprint[type];

    let canBuild = state.resources.ore >= neededRes.ore &&
        state.resources.clay >= neededRes.clay &&
        state.resources.obsidian >= neededRes.obsidian;

    return canBuild;
}

function build(type, state) {
    state.robots[type]++;
    state.resources.ore -= state.blueprint[type].ore;
    state.resources.clay -= state.blueprint[type].clay;
    state.resources.obsidian -= state.blueprint[type].obsidian;
}

function parseInput(input) {
    let rows = input.split('\n');
    let output = [];

    rows.forEach(r => {
        let [ore, clay, obs, geo] = r.split('.');

        let [, id, , , , , oreCost] = ore.split(' ');
        let [, , , , , clayCost] = clay.split(' ');
        let [, , , , , obsCost1, , , obsCost2] = obs.split(' ');
        let [, , , , , geoCost1, , , geoCost2] = geo.split(' ');

        output.push({
            id: parseInt(id),
            quality: 0,
            ore: {
                ore: parseInt(oreCost),
                clay: 0,
                obsidian: 0,
            },
            clay: {
                ore: parseInt(clayCost),
                clay: 0,
                obsidian: 0,
            },
            obsidian: {
                ore: parseInt(obsCost1),
                clay: parseInt(obsCost2),
                obsidian: 0,
            },
            geode: {
                ore: parseInt(geoCost1),
                clay: 0,
                obsidian: parseInt(geoCost2)
            }
        });

    });


    return output;
}