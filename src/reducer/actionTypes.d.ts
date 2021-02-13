import { DataActionTypes } from 'reducer/reducer';

export type ActionType = {
  type: DataActionTypes;
  dataType: string;
  data?: any[]; // (*)
  state?: boolean;
};

export interface updateDataType {
  type: DataActionTypes.UPDATE_DATA;
  dataType: string;
  data: any[];
}

export interface setErrorType {
  type: DataActionTypes.SET_ERROR;
  dataType: string;
  state: boolean;
}
