import { KeyName, Keyboard } from "../../Keyboard";

import { Layer } from "../../abstract/layer";
import { rectangleFixture } from "../../Fixture";
import Easing from "../../../Easing";
import Color, { linearColor } from "../../../Color";
import { GameFeatures } from "../../game";

export default class PlayerActor extends Layer {
  velocityMaxY = 25;

  arrowUp = Keyboard(KeyName.ARROW_UP);
  arrowDown = Keyboard(KeyName.ARROW_DOWN);
  isPresedUp = false;
  isPresedDown = false;

  //ripple effect
  needsRipple = false;
  private rippleDuration = 2;
  private initalRadius = 0;
  private radiusMax = 50;
  private rippleColor = "#ffffffbb";
  private defaultRipleColor = "#ffffffbb";
  private targetRipleColor = "#BC7593";
  private initialFillStyle: string;

  constructor() {
    super();
    this.x = 10;
    this.width = 100;
    this.height = 100;
    this.vy = 0;
    this.friction = 0.85;
    this.accY = 2;
  }

  start(gs) {
    this.initialFillStyle = "#BC7593";
    this.y = gs.canvas.height / 2 - this.height / 2;
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
    this.fillStyle = this.initialFillStyle;
  }

  update(gs: GameFeatures) {
    this.checkBounds(gs);
    this.checkCollisionWithBall(gs);
    if (this.isPresedUp) {
      this.vy -= this.accY;
    }
    if (this.isPresedDown) {
      this.vy += this.accY;
    }
    this.vy *= this.friction;
    this.y += this.vy;
    if (this.needsRipple) {
      this.rippleAnimation(gs, () => (this.needsRipple = false));
    }
  }

  render(gs) {
    rectangleFixture(this, gs);
  }

  private checkBounds(gs) {
    var maxY = Math.max(0, this.y);
    this.y = maxY;
    var minY = Math.min(gs.canvas.height - this.height, this.y);
    this.y = minY;
  }

  private checkCollisionWithBall(gs) {
    var ball = <Layer>gs.layers.ball;
    if (this.collideWith(ball)) {
      this.rotation = this.getCollisionAngle(ball);
      ball.x = this.x + this.width;
      ball.vx *= -1;
      ball.rotation *= -1;
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

  private rippleAnimation(gf: GameFeatures, ending: () => void) {
    this.initalRadius = Easing.linear(
      gf.dt,
      this.initalRadius,
      this.radiusMax,
      this.rippleDuration
    );
    const objRippleColor = Color.HexToRGBA(this.rippleColor);
    const objRippleColorTarget = Color.HexToRGBA(this.targetRipleColor);
    const linearColorToHex = linearColor(
      gf.dt,
      objRippleColor,
      objRippleColorTarget,
      this.rippleDuration
    );
    this.rippleColor = Color.RGBAtoHEX(linearColorToHex);
    if (Math.round(this.initalRadius) == this.radiusMax) {
      console.log("alphas", this.rippleColor);
      this.initalRadius = 0;
      //if (objRippleColor.alpha - objRippleColorTarget.alpha < 0.001) {
      //  this.rippleColor = this.defaultRipleColor;
      //  ending();
      //}
    }

    var x0 = this.width;
    var y0 = this.height;
    var rad0 = this.initalRadius;
    var x1 = x0;
    var y1 = y0;
    var rad1 = rad0 + 1;
    var gradient = gf.ctx.createRadialGradient(x0, y0, rad0, x1, y1, rad1);
    gradient.addColorStop(0, this.rippleColor);
    gradient.addColorStop(1, this.initialFillStyle);
    this.fillStyle = gradient;
  }
}
