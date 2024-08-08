import Bullet from "./Bullet.js";
import Enemy from "./Enemy.js";

class Tower {
    private x: number = 0;
    private y: number = 0;
    private width: number = 50;
    private height: number = 50;
    private bullet: Bullet | null = null;
    private target: Enemy | null = null;
    private range: number = 1500;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public checkRange(enemy: Enemy): void {
        if (this.target === null) {
            this.target = enemy;
        }else{
            if (this.target.isDied()) {
                this.target = null;
                this.bullet = null;
                return;
            }
        }


        let dx = this.target.getX() + this.target.getWidth() / 2 - this.x;
        let dy = this.target.getY() + this.target.getHeight() / 2 - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.range) {
            if (!this.bullet) {
                this.bullet = new Bullet(this.target, this.x, this.y);
                return;
            }

            if (this.bullet.isDestroyed()) {
                this.bullet = null;
                return;
            }

            this.bullet.move();
        }

    }

    drawObject(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());

        if (this.bullet) {
            this.bullet.drawObject(ctx);
        }
    }

    move(): void {
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

}

export default Tower;