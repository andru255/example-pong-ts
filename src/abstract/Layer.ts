export abstract class Layer {
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  isCircular: boolean = false;
  fillColor: string = "#0f0";
  strokeColor: string = "#00f";

  abstract start(gameFeatures): void;
  abstract update(gameFeatures): void;
  abstract render(gameFeatures): void;
}
