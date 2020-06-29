import Easing from "./Easing";

export interface LiteralRGBA {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

const HexToRGBA = (hexValue: string): LiteralRGBA => {
  if (!/^#([A-Fa-f0-9]{3}){1,2}([A-Fa-f0-9]{2})?$/.test(hexValue)) {
    throw `Bad Hex: ${hexValue}`;
  }
  let color = hexValue.substring(1).split("");
  let alpha = 1;
  const getWithHexPrefix = (value: string) => `0x${value}`;
  //const getRGBATplStr = (hexColor, alphaValue) => {
  //  return `rgba(${(hexColor >> 16) & 255}, ${(hexColor >> 8) & 255}, ${
  //    hexColor & 255
  //  }, ${alphaValue})`;
  //};
  const getRGBATplOBJ = (hexColor, alphaValue): LiteralRGBA => {
    return {
      red: (hexColor >> 16) & 255,
      green: (hexColor >> 8) & 255,
      blue: hexColor & 255,
      alpha: alphaValue,
    };
  };

  if (color.length == 3) {
    color = [color[0], color[0], color[1], color[1], color[2], color[2]];
    //if (format == HexToRGBAOutput.STRING) {
    //  return getRGBATplStr(getWithHexPrefix(color.join("")), alpha);
    //}
    return getRGBATplOBJ(getWithHexPrefix(color.join("")), alpha);
  }

  if (color.length == 6) {
    //if (format == HexToRGBAOutput.STRING) {
    //  return getRGBATplStr(getWithHexPrefix(color.join("")), alpha);
    //}
    return getRGBATplOBJ(getWithHexPrefix(color.join("")), alpha);
  }

  let _color = getWithHexPrefix(color.join(""));
  const _alpha = parseInt(getWithHexPrefix(_color.substring(8, 10))) / 255;
  _color = _color.substring(0, 8);
  //if (format == HexToRGBAOutput.STRING) {
  //  return getRGBATplStr(_color, _alpha);
  //}
  return getRGBATplOBJ(_color, _alpha);
};

const RGBAtoHEX = (literalRGBA: LiteralRGBA): string => {
  const compact = (value: string) => (value.length == 1 ? `0${value}` : value);
  const alpha = Math.round(literalRGBA.alpha * 255).toString(16);
  return [
    "#",
    compact(literalRGBA.red.toString(16)),
    compact(literalRGBA.green.toString(16)),
    compact(literalRGBA.blue.toString(16)),
    compact(alpha),
  ].join("");
};
// animations

// linear color transition
export function linearColor(
  time: number,
  begin: LiteralRGBA,
  change: LiteralRGBA,
  duration: number
): LiteralRGBA {
  const red = Easing.linear(time, begin.red, change.red - begin.red, duration);
  const green = Easing.linear(
    time,
    begin.green,
    change.green - begin.green,
    duration
  );
  const blue = Easing.linear(
    time,
    begin.blue,
    change.blue - begin.blue,
    duration
  );
  const alpha = Easing.linear(
    time,
    begin.alpha,
    change.alpha - begin.alpha,
    duration
  );
  return {
    red: Math.floor(red),
    green: Math.floor(green),
    blue: Math.floor(blue),
    alpha,
  };
}

const Color = {
  HexToRGBA: HexToRGBA,
  RGBAtoHEX: RGBAtoHEX,
};
export default Color;
