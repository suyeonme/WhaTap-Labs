import { ActionType } from 'reducer/actionTypes';
import { SeriesData } from 'types/types';
import { DURATION } from 'utilities/utilities';

export enum DataActionTypes {
  SET_ERROR = 'SET_ERROR',
  UPDATE_SPOT_DATA = 'UPDATE_SPOT_DATA',
  INIT_SERIES_DATA = 'INIT_SERIES_DATA',
  UPDATE_SERIES_DATA = 'UPDATE_SERIES_DATA',
}

export interface DataObject {
  data: any[];
  newData?: any[];
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
    newData: [],
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
    case DataActionTypes.INIT_SERIES_DATA:
      return {
        ...state,
        visitorPer5min: {
          ...state.visitorPer5min,
          data: action.data,
          loading: false,
        },
      };
    case DataActionTypes.UPDATE_SERIES_DATA:
      // (1) Update new data (after initial rendering)
      // (2) Compare data and new data
      // (3) If data[data.length - 1].timestamp is different with newData[0], push new data to data
      // (4) if data.timestamp < duration, slice and remove exceeded data partially.

      const previousData: SeriesData[] = state.visitorPer5min.data;
      const newData: SeriesData[] = action.data;
      const shouldUpdate: boolean =
        previousData[previousData.length - 1].timestamp !==
        newData[0].timestamp;
      const filteredData = previousData.filter(
        (data: SeriesData) => data.timestamp >= DURATION
      );
      // return {
      //   ...state,
      //   visitor5min: {
      //     newData: action.data,
      //     data: shouldUpdate ? [...filteredData, ...action.data] : filteredData,
      //     loading: false,
      //   },
      // };

      return {
        ...state,
        visitorPer5min: {
          ...state.visitorPer5min,
          newData: action.data,
          data: [...state.visitorPer5min.data, ...action.data],
          loading: false,
        },
      };
    case DataActionTypes.UPDATE_SPOT_DATA:
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
