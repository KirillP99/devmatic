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
