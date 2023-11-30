import { exec } from "./base.js";
const testinput = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

const rawinput = `Monkey 0:
Starting items: 96, 60, 68, 91, 83, 57, 85
Operation: new = old * 2
Test: divisible by 17
  If true: throw to monkey 2
  If false: throw to monkey 5

Monkey 1:
Starting items: 75, 78, 68, 81, 73, 99
Operation: new = old + 3
Test: divisible by 13
  If true: throw to monkey 7
  If false: throw to monkey 4

Monkey 2:
Starting items: 69, 86, 67, 55, 96, 69, 94, 85
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 6
  If false: throw to monkey 5

Monkey 3:
Starting items: 88, 75, 74, 98, 80
Operation: new = old + 5
Test: divisible by 7
  If true: throw to monkey 7
  If false: throw to monkey 1

Monkey 4:
Starting items: 82
Operation: new = old + 8
Test: divisible by 11
  If true: throw to monkey 0
  If false: throw to monkey 2

Monkey 5:
Starting items: 72, 92, 92
Operation: new = old * 5
Test: divisible by 3
  If true: throw to monkey 6
  If false: throw to monkey 3

Monkey 6:
Starting items: 74, 61
Operation: new = old * old
Test: divisible by 2
  If true: throw to monkey 3
  If false: throw to monkey 1

Monkey 7:
Starting items: 76, 86, 83, 55
Operation: new = old + 4
Test: divisible by 5
  If true: throw to monkey 4
  If false: throw to monkey 0`;

const monkeys = [];

const parseInput = (input) => {
    let rows = input.split('\n');


    for (let i = 0; i < rows.length; i += 7) {

        let monkey = {
            id: parseInt(rows[i].split(' ')[1].replace(/:/, '')),
            items: rows[i + 1].split(': ')[1].split(',').reduce((acc, i) => {
                acc.push(i.trim());
                return acc;
            }, []),
            op: rows[i + 2].split(' = ')[1],
            test: {
                val: parseInt(rows[i + 3].split(' by ')[1]),
                true: parseInt(rows[i + 4].split(' monkey ')[1]),
                false: parseInt(rows[i + 5].split(' monkey ')[1])
            },
            ins: 0
        };

        monkeys.push(monkey);
    }
};

const doOp = (val, operation) => {
    let [p1, op, p2] = operation.split(' ');

    if (p2 == 'old') p2 = parseInt(val);
    else p2 = parseInt(p2);
    p1 = parseInt(val);


    let result;
    if (op == '+') result = p1 + p2;
    else if (op == '*') result = p1 * p2;

    return result;

};

const playRound = () => {
    let lcd = monkeys.reduce((acc, i) => acc * i.test.val, 1);

    for (let i = 0; i < monkeys.length; i++) {
        let m = monkeys[i];

        while (m.items.length) {
            m.ins++;
            let item = m.items.shift();
            let val = doOp(item, m.op);
            let res = val % m.test.val == 0;
            monkeys[m.test[res]].items.push(val % lcd);

        }

    }
};

const printScores = () => {
    monkeys.sort((a, b) => { return b.ins - a.ins; });

    // Get top 2 scores
    let p1 = monkeys[0].ins;
    let p2 = monkeys[1].ins;
    console.log(monkeys);
    console.log(`${p1} * ${p2} = ${p1 * p2}`);
};

(() => {
    exec(() => {
        parseInput(rawinput);
        //console.log(monkeys);
        for (let i = 0; i < 10000; i++) {
            //console.log('Round', i);
            playRound();
        }
        printScores();


        // console.log(stringAdd("65", "6"));
        // console.log(stringDiv('19', '60'));
        // console.log(stringDiv('1480', '2883852'));
    });

})();
