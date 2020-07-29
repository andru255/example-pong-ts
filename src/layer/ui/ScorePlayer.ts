import { GameFeatures } from "../../game";
import { Layer } from "../../abstract/layer";
import { textFixture } from "../../Fixture";
import Color, { LiteralRGBA, linearColor, isEqualToRGBA } from "../../Color";
import Paddle from "../../abstract/Paddle";

export default class ScorePlayerUI extends Layer {
  previusScore = 0;
  fillStyleRGBA;
  defaultStartColor: LiteralRGBA = { red: 0, green: 0, blue: 0, alpha: 0 };
  startColor: LiteralRGBA;

  constructor() {
    super();
    this.x = 20;
    this.y = 70;
    this.width = 300;
    this.height = 400;
    this.fillStyle = "#BC7593";
    this.font = "60px arial, sans-serif";
    this.fillStyleRGBA = Color.HexToRGBA(this.fillStyle);
    this.startColor = this.defaultStartColor;
  }

  start(gf: GameFeatures) {
    this.x = gf.canvas.width / 2 - 100;
  }
  update(gf: GameFeatures) {
    const player = <Paddle>gf.layers.player;
    const score = player.score;
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
