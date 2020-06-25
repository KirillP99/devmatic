import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Loader.module.scss';

const Loader = ({ classNameWrapper }) => <div className={cx(styles.ldsDualRing, classNameWrapper)} />;

Loader.propTypes = {
  classNameWrapper: PropTypes.string,
};

export default Loader;
