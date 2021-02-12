import { ACTIONTYPES } from 'reducer/reducer';

export const updateData = (data, dataType) => {
  return {
    type: ACTIONTYPES.UPDATE_DATA,
    dataType: dataType,
    data: data,
  };
};

export const setLoading = (state, dataType) => {
  return {
    type: ACTIONTYPES.SET_LOADING,
    dataType: dataType,
    state: state,
  };
};

export const setError = (state, dataType) => {
  return {
    type: ACTIONTYPES.SET_ERROR,
    dataType: dataType,
    state: state,
  };
};
