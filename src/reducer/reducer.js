import { updateObject } from 'utilities/utilities';

export const ACTIONTYPES = {
  UPDATE_DATA: 'UPDATE_DATA',
  SET_ERROR: 'SET_ERROR',
};

export const INITIAL_STATE = {
  informatics: {
    data: [],
    loading: true,
    error: '',
  },
  activeStatus: {
    data: [],
    loading: true,
    error: '',
  },
  visitorPer5min: {
    data: [],
    loading: true,
    error: '',
  },
};

const updateData = (state, action) => {
  let updatedState = {
    ...state,
    [action.dataType]: {
      ...state[action.dataType],
      data: action.data,
      loading: false,
    },
  };
  return updateObject(state, updatedState);
};

const setError = (state, action) => {
  let updatedState = {
    ...state,
    [action.dataType]: {
      ...state[action.dataType],
      loading: action.state,
    },
  };
  return updateObject(state, updatedState);
};

// REDUCER
export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONTYPES.UPDATE_DATA:
      return updateData(state, action);
    case ACTIONTYPES.SET_ERROR:
      return setError(state, action);
    default:
      return state;
  }
};
