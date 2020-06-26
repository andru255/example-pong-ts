import { Layer } from "../../abstract/layer";
import RectangleFixture from "../../fixture/Rectangle";

export default class PlayerActor extends Layer {
  fixture: RectangleFixture;
  bounce = -1;
  constructor() {
    super();
    this.x = 10;
    this.y = 10;
    this.width = 100;
    this.height = 100;
    this.vx = 4;
  }

  start(gs) {
    this.fixture = new RectangleFixture();
  }

  update(gs) {
    const limit = gs.canvas.width;
    this.x += this.vx;

    if (this.x + this.width > limit || this.x <= 0) {
      this.vx *= this.bounce;
    }
  }

  render(gs) {
    this.fixture.sync(this);
    this.fixture.render(gs);
  }
}
