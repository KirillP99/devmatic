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

export const definiteOfWinner = (pairs) => {
  const resultPairs = pairs.map((item, index) => {
    if (item.valueCardOne.value === item.valueCardTwo.value) {
      return {
        value: item.valueCardOne.value,
        valueIndex: cardValues.findIndex((value) => item.valueCardOne.value === value),
        index,
      };
    }
  }).filter((item) => item);

  if (resultPairs.length === 1) {
    return {
      result: `Player ${resultPairs[0].index + 1} is win`,
      index: resultPairs[0].index,
    };
  }
  if (!resultPairs.length || checkOnSimilarItems(resultPairs.map((item) => item.value))) {
    return {
      result: 'draw',
      index: -1,
    };
  }

  const maxValue = definiteMaxValue(resultPairs.map((item) => item.valueIndex));
  const maxItem = resultPairs.find((item) => item.valueIndex === maxValue);
  return {
    result: `Player ${maxItem.index + 1} is win`,
    index: maxItem.index,
  };
};
