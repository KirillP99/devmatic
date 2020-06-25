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
import { definiteOfWinner } from '../../utils';
import styles from './Main.module.scss';

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
