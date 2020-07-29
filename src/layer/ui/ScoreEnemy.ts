import { GameFeatures } from "../../game";
import { Layer } from "../../abstract/layer";
import { textFixture } from "../../Fixture";
import Paddle from "../../abstract/Paddle";
import Easing from "../../Easing";
import Color, { linearColor, LiteralRGBA, isEqualToRGBA } from "../../Color";

export default class ScoreEnemyUI extends Layer {
  previusScore = 0;
  fillStyleRGBA;
  defaultStartColor: LiteralRGBA = { red: 0, green: 0, blue: 0, alpha: 0 };
  startColor: LiteralRGBA;

  constructor() {
    super();
    this.y = 70;
    this.width = 300;
    this.height = 400;
    this.fillStyle = "#FFFFC6";
    this.font = "60px arial, sans-serif";
    this.fillStyleRGBA = Color.HexToRGBA(this.fillStyle);
    this.startColor = this.defaultStartColor;
  }
  start(gf: GameFeatures) {
    this.x = gf.canvas.width / 2 + 50;
  }
  update(gf: GameFeatures) {
    const enemy = <Paddle>gf.layers.enemy;
    const score = enemy.score;
    if (score != this.previusScore) {
      this.startColor = linearColor(
        gf.dt,
        this.startColor,
        this.fillStyleRGBA,
        0.3
      );
      this.fillStyle = Color.RGBAtoHEX(this.startColor);
    }
    if (isEqualToRGBA(this.startColor, this.fillStyleRGBA)) {
      this.startColor = this.defaultStartColor;
      this.previusScore = score;
    }
    this.text = `${score}`;
  }
  render(gf: GameFeatures) {
    textFixture(this, gf);
  }
}
