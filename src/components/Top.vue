<script setup lang="ts">
import { computed } from "vue";
import ProgressBar from "./ProgressBar.vue";
import HabitCardList from "./HabitCardList.vue";
import HabitCalender from "./HabitCalender.vue";

import { useHabitsStore } from "../stores/habits";

import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
/** NOTE: location(Japan)を設定する */
dayjs.locale(ja);

const habitsStore = useHabitsStore();

const progress = computed(
  () =>
    habitsStore.habits.filter((_) => _.recentDate.isSame(dayjs(), "day"))
      .length / habitsStore.habits.length
);

// calenderの日付が今日じゃなければスライドして今日にする
if (!habitsStore.calender.recentDate.isSame(dayjs(), "day")) {
  habitsStore.calender.counts = (function (arr: number[], n: number): number[] {
    if (n <= 0) return arr.slice(); // 0以下ならそのままコピー
    return Array(n)
      .fill(0)
      .concat(arr.slice(0, arr.length - n));
  })(
    habitsStore.calender.counts,
    dayjs().diff(habitsStore.calender.recentDate, "day")
  );
  habitsStore.calender.recentDate = dayjs();
}
</script>

<template>
  <q-layout view="hHh lpr fFf">
    <q-header> Habby - 習慣記録アプリ</q-header>
    <q-page-container class="column content-center">
      <ProgressBar :progress="progress"></ProgressBar>
      <HabitCardList />
      <HabitCalender :calender="habitsStore.calender.counts" />
    </q-page-container>
  </q-layout>
</template>
