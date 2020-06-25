import * as actionsTypes from '../actions/actionTypes';

const initialValue = {
  data: {
    pairs: [],
    isSuccessPairs: false,
  },
};

export const allPairs = (state = initialValue, { payload, type }) => {
  switch (type) {
    case actionsTypes.allPairs.success:
      return {
        data: payload,
      };

    default:
      return state;
  }
};
