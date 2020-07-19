import { Layer } from "../../abstract/layer";
import { rectangleFixture } from "../../Fixture";
import { GameFeatures } from "../../game";
import PaddleFillStyle from "../effect/PaddleFillStyle";

export default class EnemyActor extends Layer {
  isMoveDown = false;
  isMoveUp = false;
  paddleFillStyle: PaddleFillStyle;
  needsRipple = false;

  constructor() {
    super();
    this.width = 50;
    this.height = 120;
    this.fillStyle = "#FFFFC6";
    this.paddleFillStyle = new PaddleFillStyle(this.fillStyle);
  }

  start(gf: GameFeatures) {
    this.x = gf.canvas.width - this.width;
    this.y = (gf.canvas.height - this.height) / 2;
  }

  update(gf: GameFeatures) {
    var ball = gf.layers.ball;
    if (Math.random() < 0.2) {
      this.isMoveDown = false;
      this.isMoveUp = false;
      if (ball.y + ball.height < this.y + this.height / 2) {
        this.isMoveUp = true;
        return;
      }
      if (ball.y > this.y + this.height / 2) {
        this.isMoveDown = true;
        return;
      }
    }
  }

  render(gf: GameFeatures) {
    rectangleFixture(this, gf);
  }
}
