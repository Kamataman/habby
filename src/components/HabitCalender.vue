<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  calender: number[],
}>()

function arrayChunk(array: number[], size: number): [][] {
  if (size <= 0) return [[]];
  const result = [];
  for (let i = 0, j = array.length; i < j; i += size) {
    result.push(array.slice(i, i + size) as []);
  }
  return result;
}

const rows = computed(()=>
  arrayChunk(props.calender, 7)
)
</script>

<template>
  <h3>カレンダー</h3>
  <p>色が濃い程たくさんの習慣をクリアしたよ！</p>
  <div class="calendar">
    <table>
      <tr v-for="(row, i) in rows" :key="i">
        <p v-if="i === 0">今週</p>
        <p v-else>{{ i }}週前</p>
        <td v-for="count in row">
          <p v-if="count === 0" :style="{ color: '#FFDBC9' }">■</p>
          <p v-if="count === 1" :style="{ color: '#FFAD90' }">■</p>
          <p v-if="count === 2" :style="{ color: '#FF8856' }">■</p>
          <p v-if="count === 3" :style="{ color: '#FF6928' }">■</p>
          <p v-if="count >= 4" :style="{ color: '#FF4F02' }">■</p>
        </td>
      </tr>
    </table>
  </div>
</template>
