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

export type PolyLineProps = {
  pointsCoords: Array<Point>;
};
