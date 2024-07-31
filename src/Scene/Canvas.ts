import Enemy from "../Entitys/Enemy.js";
import Bullet from "../Entitys/Bullet.js";
import Tower from "../Entitys/Tower.js";

class Canvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private WIDTH: number = 1500;
    private HEIGHT: number = 900;
    private isAnimating: boolean = false;
    private itestObject: (Enemy | Tower)[] = [];
    // private tower: Tower | undefined;

    constructor(canvas: HTMLCanvasElement) {
        // this.tower = new Tower(200, 100);
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
        let tower = new Tower(200, 200);
        this.itestObject?.push(enemy);
        this.itestObject?.push(tower);
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
        if (!this.isAnimating) return;
        for (let i = 0; i < this.itestObject.length; i++) {
            this.itestObject[i].move();
            let tower = this.itestObject[1] as Tower;
            this.itestObject[1].checkRange(this.itestObject[0] as Enemy);
        }
    }

    public draw(): void {
        this.clear();
        for (let i = 0; i < this.itestObject.length; i++) {
            this.itestObject[i].drawObject(this.ctx);
            this.itestObject[1].drawObject(this.ctx);
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