import { ActionType } from 'reducer/actionTypes';

export enum DataActionTypes {
  UPDATE_DATA = 'UPDATE_DATA',
  SET_ERROR = 'SET_ERROR',
}

interface DataObject {
  data: any[]; // (*)
  loading: boolean;
  error: string;
}

interface DataStateType {
  [key: string]: any;
  informatics: DataObject;
  activeStatus: DataObject;
  visitorPer5min: DataObject;
}

export const INITIAL_STATE: DataStateType = {
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

// REDUCER
export const reducer = (
  state: DataStateType = INITIAL_STATE,
  action: ActionType
) => {
  switch (action.type) {
    case DataActionTypes.UPDATE_DATA:
      return {
        ...state,
        [action.dataType]: {
          ...state[action.dataType],
          data: action.data,
          loading: false,
        },
      };
    case DataActionTypes.SET_ERROR:
      return {
        ...state,
        [action.dataType]: {
          ...state[action.dataType],
          error: action.message,
        },
      };
    default:
      return state;
  }
};
