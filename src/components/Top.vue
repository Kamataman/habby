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

const prompt = ref(false);

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
  <q-layout view="hHh lpr fFf">
    <q-header> Habby - 習慣記録アプリ</q-header>
    <q-page-container class="column content-center">
      <div>
        <h3>習慣一覧</h3>
        <q-list>
          <template v-for="habit in habitsStore.habits" :key="habit.id">
            <HabitCard
              :habit="habit"
              @done="doneHabit(habit.id)"
              @delete="deleteHabit(habit.id)"
            />
          </template>
        </q-list>
        <div class="flex justify-end" style="margin: 10px">
          <q-btn label="+" color="primary" @click="prompt = true" />
        </div>
        <q-dialog v-model="prompt">
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">習慣名</div>
            </q-card-section>
            <q-form @submit="addHabit">
              <q-card-section class="q-pt-none">
                <q-input
                  dense
                  v-model="newhabit"
                  autofocus
                  @keyup.enter="prompt = false"
                  :rules="[(val: string) => !!val || '入力必須です']"
                />
              </q-card-section>

              <q-card-actions :align="'right'" class="text-primary">
                <q-btn type="submit" flat label="追加" v-close-popup />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
      </div>
      <div>
        <HabitCalender :calender="habitsStore.calender.counts" />
      </div>
    </q-page-container>
  </q-layout>
</template>
