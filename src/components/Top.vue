<script setup lang="ts">
import { ref } from "vue";
import HabitCard from "./HabitCard.vue";
import HabitCalender from "./HabitCalender.vue";

import { useHabitsStore } from "../stores/habits";

import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
/** NOTE: location(Japan)を設定する */
dayjs.locale(ja);

const newhabit = ref("");
const habitsStore = useHabitsStore();

function addHabit() {
  habitsStore.addHabit(newhabit.value);
  newhabit.value = "";
}
function doneHabit(id: number) {
  habitsStore.todayDone(id);
}
function deleteHabit(id: number) {
  habitsStore.deleteHabit(id);
}

// calenderの日付チェック
if (!habitsStore.calender.recentDate.isSame(dayjs(), "day")) {
  // 必要に応じて処理を書く
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
  <h2>Habby - 習慣記録アプリ</h2>

  <h3>習慣一覧</h3>
  <div class="q-pa-sm">
    <q-list>
      <template v-for="habit in habitsStore.habits" :key="habit.id">
        <HabitCard
          :habit="habit"
          @done="doneHabit(habit.id)"
          @delete="deleteHabit(habit.id)"
        />
      </template>
    </q-list>
    <div class="row">
      <q-form @submit="addHabit">
        <q-input v-model="newhabit" outlined required placeholder="習慣名" />
        <q-btn type="submit">追加する</q-btn>
      </q-form>
    </div>
  </div>
  <div>
    <HabitCalender :calender="habitsStore.calender.counts" />
  </div>
</template>
