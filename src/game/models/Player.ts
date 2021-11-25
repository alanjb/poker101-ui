import Card from './Card';

export default interface Player {
  _id: string;
  folded: boolean;
  hand: Card[];
  isDealer: boolean;
  points: number;
  isTurn: boolean;
  email: string;
}
