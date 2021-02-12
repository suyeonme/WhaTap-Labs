import { ACTION_TYPES } from 'reducer/reducer';

export const updateData = (data, dataType) => {
  return {
    type: ACTION_TYPES.UPDATE_DATA,
    dataType: dataType,
    data: data,
  };
};

export const setLoading = (state, dataType) => {
  return {
    type: ACTION_TYPES.SET_LOADING,
    dataType: dataType,
    state: state,
  };
};

export const setError = (state, dataType) => {
  return {
    type: ACTION_TYPES.SET_ERROR,
    dataType: dataType,
    state: state,
  };
};
