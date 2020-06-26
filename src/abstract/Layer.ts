export abstract class Layer {
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  isCircular: boolean = false;
  fillStyle: string = "#0f0";
  strokeStyle: string = "#00f";
  vx: number = 0;
  vy: number = 0;

  abstract start(gameFeatures): void;
  abstract update(gameFeatures): void;
  abstract render(gameFeatures): void;
}
