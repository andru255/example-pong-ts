import BallActor from "./layer/actor/Ball";
import { Game } from "./game";
import PlayerActor from "./layer/actor/Player";

// actor layers
const player = new PlayerActor();
const ball = new BallActor();
const game = new Game("cv");

const setup = () => {
  console.log("setup game!");
  game.add("player", player);
  game.add("ball", ball);
};
const pong = () => {
  console.log("hello I'm pong v2! reloaded :)");
  setup();
  game.start();
};
export default pong;
