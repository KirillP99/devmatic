import * as actionsTypes from '../actions/actionTypes';

const initialValue = {
  pairs: [],
  isLoading: false,
  isDataReceived: false,
};

export const currentPairs = (state = initialValue, { payload, type }) => {
  switch (type) {
    case actionsTypes.currentPairs.request:
      return {
        ...state,
        isLoading: true,
        isDataReceived: false,
      };

    case actionsTypes.currentPairs.success:
      return {
        pairs: payload,
        isLoading: false,
        isDataReceived: true,
      };

    default:
      return state;
  }
};
