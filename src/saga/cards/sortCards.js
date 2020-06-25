import {
  call, select, put, delay, takeLatest,
} from 'redux-saga/effects';
import { getCardsSuccess } from '../../actions/cards';
import { shuffle } from '../../utils';
import * as actionTypes from '../../actions/actionTypes';

const getCards = (state) => state.cards.cards;

function* sortCards() {
  const cards = yield select(getCards);
  const newSortedCards = yield call(shuffle, cards);
  yield delay(2000);
  yield put(getCardsSuccess(newSortedCards));
}

export function* watchSortCards() {
  yield takeLatest(actionTypes.cards.sort, sortCards);
}
