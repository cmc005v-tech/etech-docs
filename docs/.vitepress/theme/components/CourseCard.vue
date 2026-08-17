<script setup lang="ts">
defineProps<{
  icon?: string
  title: string
  audience?: string
  hours?: string
  outcome: string
  link: string
  cta?: string
  status?: string
}>()
</script>

<template>
  <div class="course-card">
    <div v-if="icon" class="icon">{{ icon }}</div>
    <div class="title">
      {{ title }}
      <span v-if="status" class="status-badge">{{ status }}</span>
    </div>
    <div v-if="audience || hours" class="meta">
      <span v-if="audience">👥 {{ audience }}</span>
      <span v-if="hours">⏱ {{ hours }}</span>
    </div>
    <div class="outcome">{{ outcome }}</div>
    <a class="cta" :href="link">{{ cta || '进入课程' }}</a>
  </div>
</template>

<style scoped>
.status-badge {
  display: inline-block;
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 500;
  vertical-align: middle;
  margin-left: 0.5rem;
}
</style>
