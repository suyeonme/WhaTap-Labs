// Spot Data: [{name: "활성화 상태의 에이전트", data: 6}, ...]
// Series Data: [[1613104210000, 844], [...]]
export interface SpotData {
  key?: string;
  name: string;
  data: number;
}
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
