import * as actionTypes from './actionTypes';

export const getCurrentPairs = (countOfPairs) => ({
  type: actionTypes.currentPairs.request,
  payload: countOfPairs,
});

export const getCurrentPairsSuccess = (body) => ({
  type: actionTypes.currentPairs.success,
  payload: body,
});
