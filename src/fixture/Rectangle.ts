import { Layer } from "../abstract/layer";

export default class RectangleFixture extends Layer {
  start() {}
  update() {}
  sync(layer: Layer) {
    this.x = layer.x;
    this.y = layer.y;
    this.width = layer.width;
    this.height = layer.height;
  }
  render(gf) {
    const ctx = <CanvasRenderingContext2D>gf.ctx;
    ctx.save();
    ctx.fillStyle = this.fillStyle;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    if (this.strokeStyle) {
      ctx.strokeStyle = this.strokeStyle;
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    ctx.restore();
  }
}
