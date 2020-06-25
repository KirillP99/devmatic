import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';
import { currentPairsSelector, allPairsSelector } from '../../selectors';
import image from '../../static/images/pngwing.png';
import Button from '../../UI-Kit/Button/Button';
import Loader from '../../UI-Kit/Loader/Loader';
import Card from '../../UI-Kit/Card/Card';
import { sortCards } from '../../actions/cards';
import { getCurrentPairs } from '../../actions/currentPairs';
import { definiteMaxValue, checkOnSimilarItems } from '../../utils';
import { cardValues } from '../../constans';
import styles from './Main.module.scss';

const definiteOfWinner = (pairs) => {
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

const Main = () => {
  const [shouldShowCards, setShouldShowCards] = useState(false);

  const isLoadingCards = useSelector((state) => state.cards.isLoading);
  const isDataReceivedCards = useSelector((state) => state.cards.isDataReceived);
  const currentPairs = useSelector(currentPairsSelector);
  const allPairs = useSelector(allPairsSelector);
  const isDataReceivedCurrentPairs = useSelector((state) => state.currentPairs.isDataReceived);

  const dispatch = useDispatch();

  const resultOfGame = definiteOfWinner(currentPairs);

  if (isDataReceivedCurrentPairs) {
    console.log(currentPairs);
  }

  return (
    <div className={styles.container}>
      <img className={styles.cardsImage} src={image} alt="cards" />
      <div className={styles.buttons}>
        <Button
          type="button"
          onClick={() => {
            dispatch(getCurrentPairs(2));
            setShouldShowCards(true);
          }}
        >Get cards
        </Button>
        <div className={styles.shakeButtonWrapper}>
          <Button
            type="button"
            onClick={() => dispatch(sortCards())}
          >Shake
          </Button>
          {isLoadingCards && <Loader classNameWrapper={styles.loader} />}
          {isDataReceivedCards && <p className={styles.shakerIndicator}>shaked</p>}
        </div>
        {shouldShowCards && (
          <>
            <p className={styles.result}>{resultOfGame.result}</p>
            <p className={styles.result}>
              90% of hands {!allPairs.isSuccessPairs && 'don\'t'} have at least one pair
            </p>
          </>
        )}
      </div>
      {isDataReceivedCurrentPairs && (
        currentPairs.map((item, index) => (
          <div
            style={{ top: `${shouldShowCards ? 40 * (index === 0 ? 1 : index * 6) : 30}px` }}
            className={cx(styles.cardGroup, {
              [styles.cardGroupBlock]: shouldShowCards,
              [cx(styles.winner, `pair${resultOfGame.index}`)]: resultOfGame.index !== -1
              && resultOfGame.index === index,
            })}
            key={index}
          >
            <p className={styles.playerText}>Player {index + 1}</p>
            <Card item={item.valueCardOne} />
            <Card item={item.valueCardTwo} />
          </div>
        ))
      )}
    </div>
  );
};

export default Main;
