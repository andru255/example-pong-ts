import Game from "./game";
import PlayerLayer from "./layer/actors/player";

// actor layers
const player = new PlayerLayer();
const game = new Game("cv");

const setup = () => {
  console.log("setup game!");
  game.add("player", player);
};
const pong = () => {
  console.log("hello I'm pong v2! reloaded :)");
  setup();
  game.start();
  setTimeout(() => game.stop(), 200);
};
export default pong;
