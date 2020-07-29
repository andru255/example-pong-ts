import { KeyName, Keyboard } from "@toolbox/Keyboard";
import { GameFeatures } from "../../game";
import Paddle from "@abstract/Paddle";
import Ball from "./Ball";

export default class PlayerActor extends Paddle {
  arrowUp = Keyboard(KeyName.ARROW_UP);
  arrowDown = Keyboard(KeyName.ARROW_DOWN);
  needsRipple = false;

  constructor() {
    super();
    this.x = 0;
    this.width = 50;
    this.height = 100;
    this.vy = 0;
    this.friction = 0.85;
    this.accY = 2;
    this.fillStyle = "#BC7593ff";
  }

  start(gf: GameFeatures) {
    super.start(gf);
    this.y = gf.canvas.height / 2 - this.height / 2;
    const released = () => {
      this.isMoveUp = false;
      this.isMoveDown = false;
    };
    this.arrowUp.press = () => {
      this.isMoveUp = true;
      this.isMoveDown = false;
    };
    this.arrowUp.release = released;
    this.arrowDown.press = () => {
      this.isMoveUp = false;
      this.isMoveDown = true;
    };
    this.arrowDown.release = released;
  }

  update(gf: GameFeatures) {
    this.checkCollisionWithBall(gf);
    super.update(gf);
  }

  private checkCollisionWithBall(gf: GameFeatures) {
    var ball = <Ball>gf.layers.ball;
    if (this.collideWith(ball)) {
      this.rotation = this.getCollisionAngle(ball);
      ball.x = this.x + this.width;
      ball.vx *= ball.bounce;
      ball.rotation *= ball.bounce;
      const startPos = this.y - ball.y > 0 ? this.y - ball.y : ball.y - this.y;
      this.paddleFillStyle.setPosition0(this.width, startPos);
      this.needsRipple = true;
    }
    this.rotation += (0 - this.rotation) * 0.1;
  }
}
