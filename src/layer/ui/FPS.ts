import { GameFeatures } from "../../game";
import { Layer } from "../../abstract/layer";
import { textFixture } from "../../Fixture";

export default class FPSUI extends Layer {
  constructor() {
    super();
    this.x = 20;
    this.y = 20;
    this.width = 300;
    this.height = 400;
    this.fillStyle = "#f00";
    this.font = "30px arial, sans-serif";
  }
  start() {}
  update(gf: GameFeatures) {
    this.text = `FPS: ${gf.dt}`;
  }
  render(gf: GameFeatures) {
    textFixture(this, gf);
  }
}
