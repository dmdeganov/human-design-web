export interface Line {
  start: number;
  transit1?: string;
  transit2?: string;
  end: number;
}
export interface Point {
  x: number;
  y: number;
}

export interface BodyGraphDesignResponse {
  channels: ChannelsMap;
  gates: Array<number>;
  planets: Array<Planet>;
}
export type ChannelId = `${number}-${number}`;

export interface ChannelsMap {
  [key: ChannelId]: Channel;
}

export interface Channel {
  state: ChannelStateUnion;
  gate?: NumericalString;
}
export type ChannelWithId = Channel & {id: ChannelId};
export type ChannelStateUnion = 'half-active' | 'active';
export type NumericalString = `${number}` | number;
export interface Planet {
  gate: number;
  line: number;
  color: number;
  tone: number;
}

export interface ChannelsByGateIds {
  [key: ChannelId] : Line
}
