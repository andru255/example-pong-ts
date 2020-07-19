import { KeyName, Keyboard } from "../../Keyboard";

import { Layer } from "../../abstract/layer";
import { rectangleFixture } from "../../Fixture";
import { GameFeatures } from "../../game";
import PaddleFillStyle from "../effect/PaddleFillStyle";

export default class PlayerActor extends Layer {
  velocityMaxY = 25;

  arrowUp = Keyboard(KeyName.ARROW_UP);
  arrowDown = Keyboard(KeyName.ARROW_DOWN);
  isPresedUp = false;
  isPresedDown = false;
  paddleFillStyle: PaddleFillStyle;
  needsRipple = false;

  constructor() {
    super();
    this.x = 10;
    this.width = 50;
    this.height = 120;
    this.vy = 0;
    this.friction = 0.85;
    this.accY = 2;
    this.fillStyle = "#BC7593ff";
    this.paddleFillStyle = new PaddleFillStyle(this.fillStyle);
  }

  start(gf: GameFeatures) {
    this.y = gf.canvas.height / 2 - this.height / 2;
    const released = () => {
      this.isPresedUp = false;
      this.isPresedDown = false;
    };
    this.arrowUp.press = () => {
      this.isPresedUp = true;
      this.isPresedDown = false;
    };
    this.arrowUp.release = released;
    this.arrowDown.press = () => {
      this.isPresedUp = false;
      this.isPresedDown = true;
    };
    this.arrowDown.release = released;
  }

  update(gf: GameFeatures) {
    this.checkBounds(gf);
    this.checkCollisionWithBall(gf);
    if (this.isPresedUp) {
      this.vy -= this.accY;
    }
    if (this.isPresedDown) {
      this.vy += this.accY;
    }
    this.vy *= this.friction;
    this.y += this.vy;

    if (this.needsRipple) {
      this.fillStyle = this.paddleFillStyle.ripple(gf, this);
      if (this.paddleFillStyle.isRippleEnded()) {
        this.paddleFillStyle.reset();
        this.needsRipple = false;
      }
    }
  }

  render(gf) {
    rectangleFixture(this, gf);
  }

  private checkBounds(gs) {
    var maxY = Math.max(0, this.y);
    this.y = maxY;
    var minY = Math.min(gs.canvas.height - this.height, this.y);
    this.y = minY;
  }

  private checkCollisionWithBall(gf) {
    var ball = <Layer>gf.layers.ball;
    if (this.collideWith(ball)) {
      this.rotation = this.getCollisionAngle(ball);
      ball.x = this.x + this.width;
      ball.vx *= -1;
      ball.rotation *= -1;
      const startPos = this.y - ball.y > 0 ? this.y - ball.y : ball.y - this.y;
      this.paddleFillStyle.setPosition0(this.width, startPos);
      this.needsRipple = true;
    }
    this.rotation += (0 - this.rotation) * 0.1;
  }

  private getCollisionAngle(ball: Layer): number {
    const factor = -(Math.PI * 0.35);
    const diffBallYPaddleY = ball.y + ball.height - this.y;
    const sumPaddleHAndBallH = this.height + ball.height;
    const angle =
      factor + (diffBallYPaddleY / sumPaddleHAndBallH) * Math.PI * 0.7;
    return angle / 2;
  }
}
