import Enemy from "../Entitys/Enemy.js";
import Bullet from "../Entitys/Bullet.js";
import ITeste from "../Interfaces/teste.js";

class Canvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private WIDTH: number = 1500;
    private HEIGHT: number = 900;
    private isAnimating: boolean = false;
    private itestObject: (Enemy | Bullet)[] = [];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.default();
    }

    private default(): void {
        this.canvas.width = this.WIDTH;
        this.canvas.height = this.HEIGHT
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
    }

    public start(coordOrder: number[][]): void {
        let enemy = new Enemy(coordOrder);
        let bullet = new Bullet(enemy, 300, 300);
        this.itestObject?.push(enemy);
        this.itestObject?.push(bullet);
        this.isAnimating = true;
        this.animate();
    }

    public stop(): void {
        this.isAnimating = false;
    }

    private clear(): void {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
    }

    private update(): void {
        for (let i = 0; i < this.itestObject.length; i++) {
            this.itestObject[i].move();
        }
    }

    public draw(): void {
        this.clear();
        for (let i = 0; i < this.itestObject.length; i++) {
            this.itestObject[i].drawObject(this.ctx);
        }
    }

    private animate = (): void => {
        if (!this.isAnimating) return;
        this.update();
        this.draw();
        requestAnimationFrame(this.animate);
    }

}

export default Canvas;