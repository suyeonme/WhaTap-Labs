import { DataActionTypes } from 'reducer/reducer';

export type ActionType =
  | InitSeriesDataType
  | UpdateSeriesDataType
  | UpdateSpotDataType
  | SetErrorType;

export interface InitSeriesDataType {
  type: DataActionTypes.INIT_SERIES_DATA;
  data: any[];
}

export interface UpdateSeriesDataType {
  type: DataActionTypes.UPDATE_SERIES_DATA;
  dataType: string;
  data: any[];
}

export interface UpdateSpotDataType {
  type: DataActionTypes.UPDATE_SPOT_DATA;
  dataType: string;
  data: any[];
}

export interface SetErrorType {
  type: DataActionTypes.SET_ERROR;
  dataType: string;
  message: string;
}
