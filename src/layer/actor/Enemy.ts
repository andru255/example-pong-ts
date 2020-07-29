import { GameFeatures } from "../../game";
import Paddle from "@abstract/Paddle";
export default class EnemyActor extends Paddle {
  constructor() {
    super();
    this.width = 50;
    this.height = 120;
    this.accY = 2;
    this.vy = 0;
    this.friction = 0.85;
    this.fillStyle = "#FFFFC6";
    this.rippleColor = "#000";
  }

  start(gf: GameFeatures) {
    this.x = gf.canvas.width - this.width;
    this.y = (gf.canvas.height - this.height) / 2;
    super.start(gf);
  }

  update(gf: GameFeatures) {
    var ball = gf.layers.ball;
    if (Math.random() < 0.2) {
      this.isMoveDown = false;
      this.isMoveUp = false;
      if (ball.y + ball.height < this.y + this.height / 2) {
        this.isMoveUp = true;
      }
      if (ball.y > this.y + this.height / 2) {
        this.isMoveDown = true;
      }
    }
    this.checkCollisionWithBall(gf);
    super.update(gf);
  }

  private checkCollisionWithBall(gf: GameFeatures) {
    var ball = gf.layers.ball;
    if (this.collideWith(ball)) {
      this.rotation = this.getCollisionAngle(ball);
      ball.x = gf.canvas.width - this.width - ball.width;
      ball.vx *= -1;
      ball.rotation *= -1;
      const startPos = this.y - ball.y > 0 ? this.y - ball.y : ball.y - this.y;
      this.paddleFillStyle.setPosition0(0, startPos);
      this.needsRipple = true;
    }
    this.rotation += (0 - this.rotation) * 0.1;
  }
}
