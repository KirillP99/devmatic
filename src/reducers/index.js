import { combineReducers } from 'redux';
import { cards } from './cards';
import { currentPairs } from './currentPairs';
import { allPairs } from './allPairs';

const createRootReducer = () => combineReducers({
  cards,
  currentPairs,
  allPairs,
});

export default createRootReducer;
