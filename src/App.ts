import Enemy from './Entitys/Enemy.js';
import Tower from './Entitys/Tower.js';
import Canvas from './Scene/Canvas.js';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const canva = new Canvas(canvas);

const MAX_NUMBER = 13;
const WIDTH = 150;
const HEIGHT = 150;

const OFFSET = (WIDTH + HEIGHT) / 2;

export const tiles = [
    [2, 47, 47, 47, 47, 47, 47, 47, 47, 47],
    [2, 47, 47, 47, 47, 55, 47, 47, 47, 47],
    [2, 47, 47, 47, 47, 46, 46, 47, 47, 47],
    [30, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [47, 42, 47, 47, 46, 46, 51, 52, 53, 55],
    [47, 47, 47, 47, 47, 47, 47, 47, 47, 47]
];

const pathOrder = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

const coordOrder: number[][] = [];

const searchToTheMaxNumber = async () => {
    let k = 1;
    while (k != MAX_NUMBER + 1) {
        for (let i = 0; i < pathOrder.length; i++) {
            for (let j = 0; j < pathOrder[i].length; j++) {
                if (pathOrder[i][j] == k) {
                    coordOrder.push([j * OFFSET + (WIDTH / 3), i * OFFSET + (HEIGHT / 3)]);
                    k++;
                    break;
                }
            }
        }
    }
    console.log(coordOrder)
    canva.start(coordOrder);
}

searchToTheMaxNumber();

setInterval(() => {
    canva.addObjects(new Enemy(coordOrder));
}, 5000);

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[i].length; j++) {
            if (x > j * OFFSET && x < j * OFFSET + WIDTH && y > i * OFFSET && y < i * OFFSET + HEIGHT) {
                canva.addObjects(new Tower(j * OFFSET + (WIDTH / 3), i * OFFSET + (HEIGHT / 3)));
            }
        }

    }
});
