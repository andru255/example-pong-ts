import Layer from "@abstract/Layer";

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

export function textFixture(layer: Layer, gf: any) {
  const ctx = <CanvasRenderingContext2D>gf.ctx;
  ctx.save();
  ctx.beginPath();
  ctx.font = layer.font;
  ctx.strokeStyle = layer.strokeStyle;
  ctx.fillStyle = layer.fillStyle;
  ctx.fillText(layer.text, layer.x, layer.y);
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}
