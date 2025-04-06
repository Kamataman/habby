import type { Dayjs } from "dayjs";

export interface Habit {
  id: number;
  name: string;
  streak: number;
  recentDate: Dayjs;
}

export interface calender {
  recentDate: Dayjs;
  counts: number[];
}
