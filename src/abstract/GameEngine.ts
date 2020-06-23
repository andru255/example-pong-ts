import { Layer } from "./layer";
import { LayerStack } from "../LayerStack";

enum LoopStatus {
  Stopped,
  Started,
}
export default abstract class GameEngine {
  loopStatus: LoopStatus = LoopStatus.Stopped;
  animationLoop: number;
  drawFrame;
  layers: LayerStack;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  abstract getFeatures(): {};

  init(): void {}

  start(): void {
    this.loopStatus = LoopStatus.Started;

    this.layers.startOnce(this.getFeatures()).then(() => {
      this.init();
    });

    this.drawFrame = () => {
      this.animationLoop = window.requestAnimationFrame(this.drawFrame);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.layers.runLayersWithMethod("update", this.getFeatures());
      this.layers.runLayersWithMethod("render", this.getFeatures());
    };

    if (this.loopStatus == LoopStatus.Started) {
      this.drawFrame();
    }
  }

  add(name: string, layer: Layer) {
    this.layers.addLayer(name, layer);
  }

  remove(name: string) {
    // todo
    // this.layers.addLayer(name, layer);
  }

  stop() {
    this.loopStatus = LoopStatus.Stopped;
    window.cancelAnimationFrame(this.animationLoop);
  }

  restart() {
    this.stop();
    this.layers.stop();
    this.start();
  }
}
