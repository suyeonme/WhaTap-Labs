import { DataActionType } from 'reducer/reducer';

export type ActionType = {
  type: DataActionType;
  payload?: any;
  // id?: string;
};

export interface updateDataType {
  type: DataActionType.UPDATE_DATA;
  payload: any;
}

export interface setLoadingType {
  type: DataActionType.SET_LOADING;
  payload: any;
}

export interface setErrorType {
  type: DataActionType.SET_ERROR;
  payload: any;
}

// import { DataActionType } from 'reducer/reducer';

// export type ActionType = {
//   type: DataActionType;
//   payload?: any;
//   // id?: string;
// };

// export interface updateDataType {
//   type: DataActionType.UPDATE_DATA;
//   payload: any;
// }

// export interface setLoadingType {
//   type: DataActionType.SET_LOADING;
//   payload: any;
// }

// export interface setErrorType {
//   type: DataActionType.SET_ERROR;
//   payload: any;
// }
