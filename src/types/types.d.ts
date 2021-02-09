export interface Data {
  key?: string;
  name: string;
  data: number;
}

export interface ExceptionData {
  class: string;
  classHash: number;
  count: number;
  msg: string;
  oids: string;
  service: string;
  serviceHash: number;
  snapSeq: string;
  time: number;
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
