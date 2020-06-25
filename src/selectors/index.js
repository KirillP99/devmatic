import { createSelector } from 'reselect';

export const cardsSelector = createSelector(
  (state) => state.cards.cards,
  (cards) => cards,
);

export const currentPairsSelector = createSelector(
  (state) => state.currentPairs.pairs,
  (pairs) => pairs,
);

export const allPairsSelector = createSelector(
  (state) => state.allPairs.data,
  (data) => data,
);
