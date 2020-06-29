import { KeyName, Keyboard } from "../../Keyboard";

import { Layer } from "../../abstract/layer";
import { rectangleFixture, textFixture } from "../../Fixture";
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
  private rippleDuration = 0.5;
  private initalRadius = 0;
  private radiusMax = 150;
  private rippleColor = "#ffffff00";
  private defaultRipleColor = "#ffffff00";
  private targetRippleColor = "#BC7593ff";
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

  start(gf: GameFeatures) {
    this.initialFillStyle = "#BC7593";
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
    this.fillStyle = this.initialFillStyle;
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
      this.rippleAnimation(gf, () => gf.stop());
    }
  }

  render(gf) {
    rectangleFixture(this, gf);
    //this.fadeIn(gf);
    textFixture(
      {
        x: this.x + this.width / 2,
        y: this.y + this.height / 2,
        width: 300,
        height: 300,
        font: "30px arial",
        fillStyle: "#f00000",
        text: JSON.stringify(Color.HexToRGBA(this.rippleColor)),
      },
      gf
    );
    textFixture(
      {
        x: this.x + this.width / 2,
        y: this.y + this.height,
        width: 300,
        height: 300,
        font: "30px arial",
        fillStyle: "#f0f",
        text: JSON.stringify(Color.HexToRGBA(this.targetRippleColor)),
      },
      gf
    );
    //rectangleFixture(
    //  { x: 10, y: 10, width: 300, height: 300, fillStyle: "#f00" },
    //  gf
    //);
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

  private fadeIn(gf: GameFeatures) {
    const init = Color.HexToRGBA(this.rippleColor);
    const finish = Color.HexToRGBA(this.targetRippleColor);
    const anim = linearColor(gf.dt, init, finish, 3);
    this.rippleColor = Color.RGBAtoHEX(anim);
    this.fillStyle = this.rippleColor;
  }

  private rippleAnimation(gf: GameFeatures, ending: () => void) {
    this.initalRadius = Easing.linear(
      gf.dt,
      this.initalRadius,
      this.radiusMax,
      this.rippleDuration
    );
    const objRippleColor = Color.HexToRGBA(this.rippleColor);
    const objRippleColorTarget = Color.HexToRGBA(this.targetRippleColor);
    const linearColorToHex = linearColor(
      gf.dt,
      objRippleColor,
      objRippleColorTarget,
      this.rippleDuration
    );
    this.rippleColor = Color.RGBAtoHEX(linearColorToHex);
    if (Math.floor(this.initalRadius) == this.radiusMax) {
      this.initalRadius = 0;
      if (objRippleColorTarget.alpha - objRippleColor.alpha < 0.3) {
        this.rippleColor = this.defaultRipleColor;
        ending();
      }
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
