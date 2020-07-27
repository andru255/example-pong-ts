import BallActor from "./layer/actor/Ball";
import ResultUI from "./layer/ui/ScorePlayer";
import { Game } from "./game";
import PlayerActor from "./layer/actor/Player";
import EnemyActor from "./layer/actor/Enemy";
import ScorePlayerUI from "./layer/ui/ScorePlayer";
import ScoreEnemyUI from "./layer/ui/ScoreEnemy";

// actor layers
const player = new PlayerActor();
const ball = new BallActor();
const enemy = new EnemyActor();
const game = new Game("cv");

//ui layers
const scorePlayer = new ScorePlayerUI();
const scoreEnemy = new ScoreEnemyUI();

const setup = () => {
  console.log("setup game!");
  game.add("player", player);
  game.add("ball", ball);
  game.add("enemy", enemy);
  game.add("scorePlayer", scorePlayer);
  game.add("scoreEnemy", scoreEnemy);
};
const pong = () => {
  console.log("hello I'm pong v2! reloaded :)");
  setup();
  game.start();
};
export default pong;
