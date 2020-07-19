import Color, { LiteralRGBA, linearColor } from "../../../Color";
import Easing from "../../../Easing";
import { GameFeatures } from "../../game";
import { Layer } from "../../abstract/layer";

export default class PlayerFillStyle {
  defaultfillStyle: string;
  fillStyle: string;
  x0: number = 0;
  y0: number = 0;

  //ripple effect
  private rippleDuration = 0.3;
  private radius = 0;
  private radiusMax = 150;
  private defaultRippleColor = "#ffffff00";
  private rippleColor: string;
  private fillStyleRGBA: LiteralRGBA;
  private rippleColorRGBA: LiteralRGBA;

  constructor(fillStyle: string) {
    this.fillStyle = fillStyle;
    this.defaultfillStyle = fillStyle;
    this.fillStyleRGBA = Color.HexToRGBA(this.defaultfillStyle);
    this.rippleColor = this.defaultRippleColor;
    this.rippleColorRGBA = Color.HexToRGBA(this.rippleColor);
  }

  public reset() {
    this.radius = 0;
    this.rippleColorRGBA = Color.HexToRGBA(this.defaultRippleColor);
  }

  public isRippleEnded() {
    return this.radius == Math.round(this.radiusMax);
  }

  public setPosition0(x, y) {
    this.x0 = x;
    this.y0 = y;
  }

  public ripple(gf: GameFeatures, layer: Layer): CanvasGradient {
    this.radius = Easing.linear(
      gf.dt,
      this.radius,
      this.radiusMax,
      this.rippleDuration
    );
    this.rippleColorRGBA = linearColor(
      gf.dt,
      this.rippleColorRGBA,
      this.fillStyleRGBA,
      this.rippleDuration
    );
    this.rippleColor = Color.RGBAtoHEX(this.rippleColorRGBA);
    var x0 = this.x0; //layer.width;
    var y0 = this.y0; //layer.height;
    var rad0 = this.radius;
    var x1 = x0;
    var y1 = y0;
    var rad1 = rad0 + 1;
    var gradient = gf.ctx.createRadialGradient(x0, y0, rad0, x1, y1, rad1);
    gradient.addColorStop(0, this.rippleColor);
    gradient.addColorStop(1, this.defaultfillStyle);
    return gradient;
  }
}
