import { ref } from "vue";
import { defineStore } from "pinia";

import { Habit } from "../types/habit";

import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
/** NOTE: location(Japan)を設定する */
dayjs.locale(ja);

export const useHabitsStore = defineStore(
  "habits",
  () => {
    // 初期状態を定義
    const habits = ref([
      {
        name: "ベンチプレス",
        streak: 0,
        recentDate: dayjs("2025-3-1"),
      },
      {
        name: "読書",
        streak: 4,
        recentDate: dayjs("2025-4-3"),
      },
      {
        name: "掃除",
        streak: 2,
        recentDate: dayjs("2025-4-2"),
      },
    ]);

    const calender = ref({
      recentDate: dayjs("2025-4-1"),
      counts: Array(28).fill(0),
    });

    // アクション（状態変更を定義）
    function addHabit(name: string) {
      habits.value.push({
        name: name,
        streak: 0,
        recentDate: dayjs("2000-1-1"),
      });
    }

    function todayDone(index: number) {
      const habit = habits.value[index];
      if (habit === undefined) return;
      if (dayjs().diff(habit.recentDate) / (24 * 60 * 60 * 1000) >= 2) {
        habit.streak = 1;
      } else {
        habit.streak++;
      }
      habit.recentDate = dayjs();

      calender.value.counts[0]++;
    }

    function deleteHabit(index: number) {
      habits.value = habits.value.filter((_, i) => i !== index);
    }

    return {
      habits,
      calender,
      addHabit,
      todayDone,
      deleteHabit,
    };
  },
  {
    persist: {
      enabled: true, // 明示的に true にすると確実
      serializer: {
        serialize: JSON.stringify,
        deserialize: (value: string) => {
          const parsed = JSON.parse(value);
          parsed.habits.map((h: Habit) => {
            h.recentDate = dayjs(h.recentDate);
          });
          parsed.calender.recentDate = dayjs(parsed.calender.recentDate);
          return parsed;
        },
      },
    },
  } as any // IDEのエラー無視
);
