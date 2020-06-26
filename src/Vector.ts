export default class Vector {
  _x: number;
  _y: number;

  _c: boolean;
  _xMin: number;
  _yMin: number;
  _xMax: number;
  _yMax: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  add(vector: Vector, dt = 1) {
    return vectorFactory(
      this.x + (vector.x || 0) * dt,
      this.y + (vector.y || 0) * dt,
      this
    );
  }

  clamp(xMin, yMin, xMax, yMax) {
    this._c = true;
    this._xMin = xMin;
    this._yMin = yMin;
    this._xMax = xMax;
    this._yMax = yMax;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  set x(value: number) {
    this._x = this._c
      ? Math.min(Math.max(this._xMin, value), this._xMax)
      : value;
  }

  set y(value: number) {
    this._y = this._c
      ? Math.min(Math.max(this._yMin, value), this._yMax)
      : value;
  }
}

function vectorFactory(x, y, vector?: Vector) {
  let _vector = new Vector(x, y);
  if (vector._c) {
    _vector.clamp(vector._xMax, vector._yMax, vector._xMin, vector._yMin);
    vector.x = x;
    vector.y = y;
  }
  return vector;
}
vectorFactory.prototype = Vector.prototype;
vectorFactory.class = Vector;
