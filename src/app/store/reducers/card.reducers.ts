import { Card } from './../../entities/card';
import { CardAction, CardActionTypes } from '../actions/card.actions';

const initialState: Array<Card> = [
  {
    id: 1,
    cardHeader: 'initial card header',
    cardText: 'initial card text'
  }
];

export function CardReducer(state: Array<Card> = initialState, action:
  CardAction) {
    switch (action.type) {
      case CardActionTypes.ADD_CARD:
        return [...state, action.payload];
      case CardActionTypes.DELETE_CARD:
        return state.filter(item => item.id !== action.payload);
      default:
        return state;
    }
  }
