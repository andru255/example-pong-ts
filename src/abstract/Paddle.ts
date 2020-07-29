import { Layer } from "@abstract/Layer";
import { rectangleFixture } from "../Fixture";
import { GameFeatures } from "../game";
import PaddleFillStyle from "../layer/effect/PaddleFillStyle";

export default class Paddle extends Layer {
  velocityMaxY = 25;
  isMoveUp = false;
  isMoveDown = false;
  rippleColor = "#ffffff";
  paddleFillStyle: PaddleFillStyle;
  needsRipple = false;
  score = 0;

  public start(gf: GameFeatures) {
    this.paddleFillStyle = new PaddleFillStyle(
      <string>this.fillStyle,
      this.rippleColor
    );
  }

  update(gf: GameFeatures) {
    this.checkBounds(gf);
    this.move(gf);

    if (this.needsRipple) {
      this.fillStyle = this.paddleFillStyle.ripple(gf, this);
      if (this.paddleFillStyle.isRippleEnded()) {
        this.paddleFillStyle.reset();
        this.needsRipple = false;
      }
    }
  }

  render(gf: GameFeatures) {
    rectangleFixture(this, gf);
  }

  getCollisionAngle(ball: Layer): number {
    const factor = -(Math.PI * 0.35);
    const diffBallYPaddleY = ball.y + ball.height - this.y;
    const sumPaddleHAndBallH = this.height + ball.height;
    const angle =
      factor + (diffBallYPaddleY / sumPaddleHAndBallH) * Math.PI * 0.7;
    return angle / 2;
  }

  private move(gf: GameFeatures) {
    if (this.isMoveUp) {
      this.vy -= this.accY;
    }
    if (this.isMoveDown) {
      this.vy += this.accY;
    }
    if (this.vy < -this.velocityMaxY) {
      this.vy = -this.velocityMaxY;
    }
    if (this.vy > this.velocityMaxY) {
      this.vy = this.velocityMaxY;
    }
    this.vy *= this.friction;
    this.y += this.vy;
  }

  private checkBounds(gf: GameFeatures) {
    var maxY = Math.max(0, this.y);
    this.y = maxY;
    var minY = Math.min(gf.canvas.height - this.height, this.y);
    this.y = minY;
  }
}
