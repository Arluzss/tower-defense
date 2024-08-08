
import Enemy from "./Enemy.js";

class Bullet {
    private x: number = 0;
    private y: number = 0;
    private radius: number = 10;
    private speed: number = 3.85;
    private enemy: Enemy | undefined;
    private destroyed: boolean = false;

    constructor(enemy: Enemy, x: number, y: number) {
        this.enemy = enemy;
        this.x = x;
        this.y = y;
    }

    public drawObject(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.getX(), this.getY(), this.getRadius(), 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    public move(): void {
        if (!this.enemy) return;

        let dx = this.enemy.getX() + this.enemy.getWidth() / 2 - this.x;
        let dy = this.enemy.getY() + this.enemy.getHeight() / 2 - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        let collisionDistance = this.enemy.getWidth() / 4;

        if (distance < collisionDistance) {
            this.destroy();
            this.enemy.setLife(0);
        } else {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        }
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getRadius(): number {
        return this.radius;
    }

    public isDestroyed(): boolean {
        return this.destroyed;
    }

    private destroy(): void {
        this.destroyed = true;
    }

}

export default Bullet;
