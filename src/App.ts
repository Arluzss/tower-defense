import Canvas from './Scene/Canvas.js';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const canva = new Canvas(canvas);

const MAX_NUMBER = 24;
const WIDTH = 150;
const HEIGHT = 150;

const OFFSET = (WIDTH + HEIGHT) / 2;

const tiles = [
    [1, 1, 2, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const pathOrder = [
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 24],
    [4, 3, 8, 9, 0, 0, 0, 0, 0, 23],
    [5, 6, 7, 10, 11, 0, 0, 0, 0, 22],
    [0, 0, 0, 0, 12, 12, 0, 0, 0, 21],
    [0, 0, 0, 0, 13, 13, 0, 0, 0, 20],
    [0, 0, 0, 0, 14, 15, 16, 17, 18, 19]
]

const coordOrder: number[][] = [];

const searchToTheMaxNumber = async () => {
    let k = 1;

    while (k != MAX_NUMBER + 1) {
        for (let i = 0; i < pathOrder.length; i++) {
            for (let j = 0; j < pathOrder[i].length; j++) {
                if (pathOrder[i][j] == k) {
                    coordOrder.push([j * OFFSET + WIDTH / 3, i * OFFSET + HEIGHT / 3]);
                    k++;
                    break;
                }
            }
        }
    }
    canva.start(coordOrder);
}

searchToTheMaxNumber();