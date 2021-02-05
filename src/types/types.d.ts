export interface Data {
  key: string;
  name: string;
  data: number;
}

export interface Margins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export type GroupData = Data[];
export type Endpoints = string[];
export type GroupTag = SVGGElement | null;
