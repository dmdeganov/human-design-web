export type PickedDate = {
  day: number;
  month: string;
  year: number;
};
export interface PickedTime {
  hour: number;
  minute: number;
  period: 'AM' | 'PM';
}
export type WheelType = keyof PickedDate | keyof PickedTime;
