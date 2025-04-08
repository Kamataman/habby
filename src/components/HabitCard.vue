<script setup lang="ts">
import { computed } from "vue";
import { useQuasar } from "quasar";
import type { Habit } from "../types/habit";

import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
/** NOTE: location(Japan)を設定する */
dayjs.locale(ja);

const emit = defineEmits(["done", "delete"]);
const props = defineProps<{
  habit: Habit;
}>();

const $q = useQuasar();

const checked = computed(() => props.habit.recentDate.isSame(dayjs(), "day"));
const checkedYesterday = computed(() =>
  props.habit.recentDate.add(1, "day").isSame(dayjs(), "day")
);

function doneHabit() {
  $q.notify({
    type: "positive",
    message: "よくできました！💯 今日も継続！",
    timeout: 2000,
    position: "top", // top, bottom, center など
  });
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
        <q-checkbox
          :model-value="checked"
          :disable="checked"
          @update:model-value="doneHabit"
        />
        <template v-if="checked"> {{ habit.streak }}日連続更新中🔥 </template>
        <template v-else-if="checkedYesterday">
          {{ habit.streak }}日連続達成
        </template>
        <template v-else> {{ habit.streak }}日連続ストップ👇 </template>
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <button @click="deleteHabit">✖</button>
    </q-item-section>
  </q-item>
</template>
