import { DataActionTypes } from 'reducer/reducer';
import { updateDataType, setErrorType } from 'reducer/actionTypes';

export const updateData = (data: any[], dataType: string): updateDataType => {
  return {
    type: DataActionTypes.UPDATE_DATA,
    dataType: dataType,
    data: data,
  };
};

export const setError = (state: boolean, dataType: string): setErrorType => {
  return {
    type: DataActionTypes.SET_ERROR,
    dataType: dataType,
    state: state,
  };
};
