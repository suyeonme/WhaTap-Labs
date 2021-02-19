import { DataObject } from 'reducer/reducer';

export const WIDTH: number = 500;
export const HEIGHT: number = 300;

export const MIN_30: number = 30 * 60 * 1000;
export const NOW: number = Date.now();
export const DURATION: number = Date.now() - MIN_30;

export const getLastSeriesTime = (seriesData: DataObject): number => {
  return seriesData.data[seriesData.data.length - 1]?.timestamp;
};
