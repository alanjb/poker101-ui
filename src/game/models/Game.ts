import Card from './Card';
import Player from './Player';

export default interface Game {
  _id: String;
  pot: Number;
  roundCount: Number;
  status: String;
  players: Player[];
  deck: Card[];
  requiredPointsPerPlayer: Number;
  anteAmount: Number;
}
