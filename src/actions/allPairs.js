import * as actionTypes from './actionTypes';

export const getAllPairsSuccess = (body) => ({
  type: actionTypes.allPairs.success,
  payload: body,
});
