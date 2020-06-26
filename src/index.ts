import Game from "./game";
import PlayerActor from "./layer/actor/player";

// actor layers
const player = new PlayerActor();
const game = new Game("cv");

const setup = () => {
  console.log("setup game!");
  game.add("player", player);
};
const pong = () => {
  console.log("hello I'm pong v2! reloaded :)");
  setup();
  game.start();
};
export default pong;
