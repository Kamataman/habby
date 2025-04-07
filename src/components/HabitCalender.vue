<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  calender: number[];
}>();

function arrayChunk(array: number[], size: number): [][] {
  if (size <= 0) return [[]];
  const result = [];
  for (let i = 0, j = array.length; i < j; i += size) {
    result.push(array.slice(i, i + size) as []);
  }
  return result;
}

const rows = computed(() => arrayChunk(props.calender, 7));
// 色分け
const getColorClass = (count:number) => {
  let color = "#eee";
  if (count === 0 ) color = "#ddd";
  else if (count < 3) color = "#a3d9a5";
  else if (count < 5) color = "#5cb85c";
  else if (count >= 5) color = "#3e8e41";
  return color
};

</script>

<template>
  <h3>カレンダー</h3>
  <p>色が濃い程たくさんの習慣をクリアしたよ！</p>
  <div class="calendar">
    <div v-for="(row, i) in rows" :key="i" class="flex flex-col">
      <!-- <div v-if="i === 0">今週</div>
        <div v-else>{{ i }}週前</div> -->
      <div
        v-for="count in row"
        :style="{
          width: '16px',
          height: '16px',
          margin: '2px',
          borderRadius: '3px',
          backgroundColor: getColorClass(count),
        }">
        <!-- <div v-if="count === 1" :style="{ color: '#FFAD90' }">■</div>
        <div v-if="count === 2" :style="{ color: '#FF8856' }">■</div>
        <div v-if="count === 3" :style="{ color: '#FF6928' }">■</div>
        <div v-if="count >= 4" :style="{ color: '#FF4F02' }">■</div> -->
      </div>
    </div>
  </div>
</template>
