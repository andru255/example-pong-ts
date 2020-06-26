import GameEngine from "./abstract/GameEngine";
import { LayerStack } from "./LayerStack";

export default class Game extends GameEngine {
  constructor(canvasId) {
    super();
    this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.layers = new LayerStack();
  }

  getFeatures() {
    return {
      dt: this.step,
      canvas: this.canvas,
      ctx: this.ctx,
      name: "PONGV2",
      layers: this.layers.getLayers(),
      start: this.start,
      stop: this.stop,
      restart: this.restart,
    };
  }
}
