<script setup lang="ts">
import { ref } from "vue";

import HabitCard from "./HabitCard.vue";
import { useHabitsStore } from "../stores/habits";

const habitsStore = useHabitsStore();
const newhabit = ref("");
const prompt = ref(false);

function addHabit() {
  habitsStore.addHabit(newhabit.value);
  newhabit.value = "";
}
function doneHabit(index: number) {
  habitsStore.todayDone(index);
}
function deleteHabit(index: number) {
  habitsStore.deleteHabit(index);
}
</script>

<template>
  <div>
    <h3>習慣一覧</h3>
    <q-list>
      <template v-for="(habit, index) in habitsStore.habits" :key="index">
        <HabitCard
          :habit="habit"
          @done="doneHabit(index)"
          @delete="deleteHabit(index)"
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
</template>
