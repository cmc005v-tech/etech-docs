<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const { page } = useData()

const lastUpdated = computed(() => {
  return page.value.lastUpdated
    ? new Date(page.value.lastUpdated).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null
})
</script>

<template>
  <span v-if="lastUpdated" class="last-updated">
    📅 课程最后更新：{{ lastUpdated }}
  </span>
</template>

<style scoped>
.last-updated {
  display: inline-block;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-bottom: 1rem;
}
</style>
