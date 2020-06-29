import BallActor from "./layer/actor/Ball";
import FPSUI from "./layer/ui/FPS";
import { Game } from "./game";
import PlayerActor from "./layer/actor/Player";

// actor layers
const player = new PlayerActor();
const ball = new BallActor();
const game = new Game("cv");

//ui layers
const fps = new FPSUI();

const setup = () => {
  console.log("setup game!");
  game.add("player", player);
  game.add("ball", ball);
  game.add("fps", fps);
};
const pong = () => {
  console.log("hello I'm pong v2! reloaded :)");
  setup();
  game.start();
};
export default pong;
