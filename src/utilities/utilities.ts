import { DataObject } from 'reducer/reducer';

export const WIDTH: number = 500;
export const HEIGHT: number = 300;

export const getLastSeriesTime = (seriesData: DataObject): number => {
  return seriesData.data[seriesData.data.length - 1]?.timestamp;
};
