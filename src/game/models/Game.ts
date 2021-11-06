import Card from './Card';
import Player from './Player';

export default interface Game {
  id: String;
  pot: Number;
  roundCount: Number;
  status: String;
  players: Partial<Player>[];
  deck: Card[];
  requiredPointsPerPlayer: Number;
  antiAmount: Number;
}
