import { Layer } from "../../abstract/layer";
import { rectangleFixture } from "../../Fixture";
import Paddle from "../../abstract/Paddle";

export default class Ball extends Layer {
  speed = 5;
  speedRotation = 0.1;
  constructor() {
    super();
    this.radius = 20;
    this.lineWidth = 1;
    this.fillStyle = "#65CBE2";
    this.bounce = -1;
    this.width = this.radius * 2;
    this.height = this.radius * 2;
    this.shared = { player: 0, enemy: 0 };
  }
  start(gs) {
    this.x = gs.canvas.width / 2;
    this.y = gs.canvas.height / 2;
    this.vx = this.speed;
    this.vy = this.speed;
  }
  update(gf) {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.speedRotation;
    this.checkBounds(gf);
  }
  render(gf) {
    const ctx = <CanvasRenderingContext2D>gf.ctx;
    ctx.save();
    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fillStyle;
    ctx.beginPath();
    ctx.translate(this.x + this.radius, this.y + this.radius);
    ctx.rotate(this.rotation);
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // render debug line rotation
    const opts: Layer = {
      x: this.x + this.radius,
      y: this.y + this.radius,
      width: 1,
      height: this.radius,
      fillStyle: "#f00",
      rotation: this.rotation,
    };
    rectangleFixture(opts, gf);
  }

  private checkBounds(gf) {
    const player = <Paddle>gf.layers.player;
    const enemy = <Paddle>gf.layers.enemy;

    if (this.y <= 0 || this.y + this.radius * 2 > gf.canvas.height) {
      this.vy *= this.bounce;
    }
    if (this.x <= 0) {
      enemy.score += 1;
      this.vx *= this.bounce;
    }
    if (this.x + this.radius * 2 > gf.canvas.width) {
      player.score += 1;
      this.vx *= this.bounce;
    }
  }
}
