import Card from './Card';

export default interface Player {
  id: String;
  folded: boolean;
  hand: Card[];
  isDealer: boolean;
  points: number;
}
