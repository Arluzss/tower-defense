import ITeste from "../Interfaces/teste";

class Enemy implements ITeste{
    private health: number = 100;
    private x: number = 0;
    private y: number = 0;
    private width: number = 50;
    private height: number = 50;
    private speed: number = 1.85;
    private currentIndex: number = 0;
    private targetX: number = 0;
    private targetY: number = 0;
    private target: number[][] = [];

    constructor(target: number[][]) {
        this.target = target;
        console.log('Enemy created');
    }

    drawObject(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
    }

    public move(): void {

        let dx = this.targetX - this.x;
        let dy = this.targetY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.speed) {
            this.x = this.targetX;
            this.y = this.targetY;
            this.currentIndex++;

            if (this.currentIndex < this.target.length) {
                this.targetX = this.target[this.currentIndex][0];
                this.targetY = this.target[this.currentIndex][1];
            } else {
                console.log('acabou o caminho');
                return;
            }

        } else {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        }
    }

    public setLife(life: number): void {
        this.health = life;
    }

    public getLife(): number {
        return this.health;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }
}

export default Enemy;