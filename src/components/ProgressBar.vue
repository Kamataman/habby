<script setup lang="ts">
const props = defineProps<{
  progress: number;
}>();
</script>

<template>
  <div>
    <h3>今日の進捗率</h3>
    <div class="content-center">
      <span>{{ progress * 100 }}%達成！</span>
      <q-linear-progress
        :value="progress"
        color="positive"
        size="20px"
        class="q-mt-md"
      />
    </div>
  </div>
</template>
