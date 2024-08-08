import Enemy from "../Entitys/Enemy.js";
import Tower from "../Entitys/Tower.js";

class Canvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private WIDTH: number = 1500;
    private HEIGHT: number = 900;
    private isAnimating: boolean = false;
    private background: HTMLImageElement = new Image();
    private enemy: Enemy[] = [];
    private tower: Tower[] = [];
    private life: number = 100;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.background.src = './public/images/teste.png';
        this.default();
    }

    private default(): void {
        this.canvas.width = this.WIDTH;
        this.canvas.height = this.HEIGHT
    }

    public start(coordOrder: number[][]): void {
        this.isAnimating = true;
        this.animate();
    }

    public stop(): void {
        this.isAnimating = false;
    }

    private clear(): void {
        this.ctx.drawImage(this.background, 0, 0, this.WIDTH, this.HEIGHT);
    }

    private update(): void {
        if (!this.isAnimating) return;
        for (let i = 0; i < this.enemy.length; i++) {
            this.enemy[i].move();
            if (this.enemy[i].isEndPath() || this.enemy[i].isDied()) {
                this.life -= 10;
                this.enemy.splice(i, 1);
            }
            for (let j = 0; j < this.tower.length; j++) {
                this.tower[j].checkRange(this.enemy[i]);
            }
        }
        if (this.life <= 0) {
            this.stop();
            alert("perdesse, bye bye");
        }
    }

    public draw(): void {
        this.clear();
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.canvas.width / 2, 0, this.life, 50);
        for (let i = 0; i < this.enemy.length; i++) {
            this.enemy[i].drawObject(this.ctx);
        }
        for (let i = 0; i < this.tower.length; i++) {
            this.tower[i].drawObject(this.ctx);
        }
    }

    private animate = (): void => {
        if (!this.isAnimating) return;
        this.draw();
        this.update();
        requestAnimationFrame(this.animate);
    }

    public addObjects(object: Enemy | Tower): void {
        if (object instanceof Enemy) {
            this.enemy.push(object);
        } else if (object instanceof Tower) {
            this.tower.push(object)
        }
    }
}

export default Canvas;