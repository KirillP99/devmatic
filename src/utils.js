import { cardSuits, cardValues } from './constans';

export const shuffle = (array) => {
  let temporaryValue;
  let randomIndex;
  const arrayLength = array.length - 1;

  for (let i = arrayLength; i >= 0; i -= 1) {
    randomIndex = Math.floor(Math.random() * i);
    temporaryValue = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export const getRandomCards = (array, countOfPlayers) => {
  let sortedArr = array;
  let resultArray = [];
  let randomIndex;

  for (let i = sortedArr.length - 1; i >= 0; i -= 1) {
    randomIndex = Math.floor(Math.random() * i);
    const findItem = sortedArr[randomIndex];
    resultArray = [...resultArray, findItem];
    sortedArr = [...sortedArr.slice(0, randomIndex), ...sortedArr.slice(randomIndex + 1)];

    if (resultArray.length === countOfPlayers * 2) {
      break;
    }
  }

  return resultArray;
};

export const generateCards = () => {
  let newArr = [];

  cardSuits.forEach((item) => {
    const generatedArray = cardValues.map((itemChild) => ({
      value: itemChild,
      suit: item,
    }));
    newArr = [...newArr, ...generatedArray];
  });

  return newArr;
};

export const definiteMaxValue = (numArray) => Math.max.apply(null, numArray);

export const checkOnSimilarItems = (arr) => arr.every((item) => item === arr[0]);
