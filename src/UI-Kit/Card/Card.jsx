import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Card.module.scss';

const Card = ({ item, classNameWrapper }) => (
  <div className={cx(styles.wrapper, classNameWrapper)}>
    <p className={styles.topValue}>{item.value}</p>
    <img className={styles.image} src={item.suit} alt="suit" />
    <p className={styles.bottomValue}>{item.value}</p>
  </div>
);

Card.propTypes = {
  item: PropTypes.shape({
    value: PropTypes.string,
    suit: PropTypes.string,
  }),
  classNameWrapper: PropTypes.string,
};

export default Card;
