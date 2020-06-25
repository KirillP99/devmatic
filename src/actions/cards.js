import * as actionTypes from './actionTypes';

export const sortCards = () => ({
  type: actionTypes.cards.sort,
});

export const getCardsSuccess = (body) => ({
  type: actionTypes.cards.success,
  payload: body,
});
