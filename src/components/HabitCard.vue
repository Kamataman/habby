<script setup lang="ts">
import type { Habit } from "../types/habit";

import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
/** NOTE: location(Japan)を設定する */
dayjs.locale(ja);

const emit = defineEmits(["done", "delete"]);
const props = defineProps<{
  habit: Habit;
}>();

function doneHabit() {
  emit("done");
}

function deleteHabit() {
  if (window.confirm("削除しますか？")) {
    emit("delete");
  }
}
</script>

<template>
  <q-item>
    <q-item-section>
      <q-item-label> {{ habit.name }} </q-item-label>

      <q-item-label caption>
        <template v-if="habit.recentDate.isSame(dayjs(), 'day')">
          <input type="checkbox" disabled checked />
          {{ habit.streak }}日連続更新中🔥
        </template>
        <template
          v-else-if="habit.recentDate.add(1, 'day').isSame(dayjs(), 'day')"
        >
          <q-checkbox @change="doneHabit" /> {{ habit.streak }}日連続達成
        </template>
        <template v-else>
          <input type="checkbox" @change="doneHabit" />
          {{ habit.streak }}日連続ストップ👇
        </template>
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <button @click="deleteHabit">✖</button>
    </q-item-section>
  </q-item>
</template>
