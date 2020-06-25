import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import { getCurrentPairsSuccess } from '../../actions/currentPairs';
import { getAllPairsSuccess } from '../../actions/allPairs';
import { getRandomCards } from '../../utils';
import * as actionTypes from '../../actions/actionTypes';

const sortPairsForPlayers = (pairs) => {
  let arrayForPlayers = [];
  const arrayLength = pairs.length - 1;

  for (let i = 1; i <= arrayLength; i += 2) {
    arrayForPlayers = [...arrayForPlayers, {
      valueCardOne: pairs[i - 1],
      valueCardTwo: pairs[i],
    }];
  }

  return arrayForPlayers;
};

const definiteSuccess = (allPairs) => {
  const ninePartOfArray = allPairs.length * 90 / 100;
  const newArray = allPairs.slice(0, ninePartOfArray + 1);
  let countSuccess = 0;
  newArray.forEach((item) => {
    if (item.valueCardOne.value === item.valueCardTwo.value) {
      countSuccess += 1;
    }
  });

  return countSuccess > 0;
};

const getCards = (state) => state.cards.cards;
const getAllPairs = (state) => state.allPairs.data;

function* getCurrentPairs({ payload }) {
  const cards = yield select(getCards);
  const allPairs = yield select(getAllPairs);
  const currentPairs = yield call(getRandomCards, cards, payload);
  const arrayCurrentPairsForPlayers = yield call(sortPairsForPlayers, currentPairs);
  yield put(getAllPairsSuccess({
    pairs: [...allPairs.pairs, ...arrayCurrentPairsForPlayers],
    isSuccessPairs: definiteSuccess(allPairs.pairs),
  }));
  yield put(getCurrentPairsSuccess(arrayCurrentPairsForPlayers));
}

export function* watchGetCurrentPairs() {
  yield takeLatest(actionTypes.currentPairs.request, getCurrentPairs);
}
