import * as actionsTypes from '../actions/actionTypes';
import { generateCards } from '../utils';

const initialValue = {
  cards: generateCards(),
  isLoading: false,
  isDataReceived: false,
};

export const cards = (state = initialValue, { payload, type }) => {
  switch (type) {
    case actionsTypes.cards.sort:
      return {
        ...state,
        isLoading: true,
        isDataReceived: false,
      };

    case actionsTypes.cards.success:
      return {
        cards: payload,
        isLoading: false,
        isDataReceived: true,
      };

    default:
      return state;
  }
};
