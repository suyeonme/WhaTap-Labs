import { DataActionTypes } from 'reducer/reducer';
import {
  InitSeriesDataType,
  UpdateSeriesDataType,
  UpdateSpotDataType,
  SetErrorType,
} from 'reducer/actionTypes';

export const initSeriesData = (data: any[]): InitSeriesDataType => {
  return {
    type: DataActionTypes.INIT_SERIES_DATA,
    data: data,
  };
};

export const updateSeriesData = (
  data: any[],
  dataType: string
): UpdateSeriesDataType => {
  return {
    type: DataActionTypes.UPDATE_SERIES_DATA,
    dataType: dataType,
    data: data,
  };
};

export const updateSpotData = (
  data: any[],
  dataType: string
): UpdateSpotDataType => {
  return {
    type: DataActionTypes.UPDATE_SPOT_DATA,
    dataType: dataType,
    data: data,
  };
};

export const setError = (message: string, dataType: string): SetErrorType => {
  return {
    type: DataActionTypes.SET_ERROR,
    dataType: dataType,
    message: message,
  };
};
