import { Layer } from "./abstract/layer";

export function rectangleFixture(layer: Layer, gf: any) {
  const ctx = <CanvasRenderingContext2D>gf.ctx;
  ctx.save();
  ctx.fillStyle = layer.fillStyle;
  ctx.translate(layer.x, layer.y);
  ctx.rotate(layer.rotation);
  ctx.fillRect(0, 0, layer.width, layer.height);
  if (layer.strokeStyle) {
    ctx.strokeStyle = layer.strokeStyle;
    ctx.strokeRect(0, 0, layer.width, layer.height);
  }
  ctx.restore();
}
