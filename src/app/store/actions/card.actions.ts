import { Action } from '@ngrx/store';
import { Card } from '../../entities/card';

export enum CardActionTypes {
  ADD_CARD = '[CARD] Add Card',
  DELETE_CARD = '[CARD] Delete Card'
}

export class AddCardAction implements Action {
  readonly type = CardActionTypes.ADD_CARD;

  constructor(public payload: Card) {}
}

export class DeleteCardAction implements Action {
  readonly type = CardActionTypes.DELETE_CARD;

  constructor(public payload: number) {}
}

export type CardAction = AddCardAction | DeleteCardAction;
