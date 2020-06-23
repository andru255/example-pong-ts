import { Layer } from "../../abstract/layer";

export default class PlayerLayer extends Layer {
  constructor() {
    super();
  }
  start(gameSettings) {
    console.log("this is start Im the first layer :D", gameSettings);
  }
  update() {
    console.log("this is update Im the first layer :D");
  }
  render() {
    console.log("this is render Im the first layer :D");
  }
}
