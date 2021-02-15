export interface SpotData {
  key?: string;
  name: string;
  data: number;
}

export interface SeriesData {
  timestamp: number;
  value: number;
}

export type OriginalSeriesData = number[];

export interface DataState {
  data: any[];
  loading: boolean;
  error: string;
}

export interface Margins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export type GroupData = SpotData[];
export type Endpoints = string[];
export type GroupTag = SVGGElement | null;
