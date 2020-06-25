import { all } from 'redux-saga/effects';
import { watchSortCards } from './cards/sortCards';
import { watchGetCurrentPairs } from './pairs/getCurrentPairs';

export function* rootSaga() {
  yield all([
    watchSortCards(),
    watchGetCurrentPairs(),
  ]);
}
