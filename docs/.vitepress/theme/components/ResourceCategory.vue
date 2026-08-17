<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="resource-category">
    <h3 class="category-title">{{ title }}</h3>
    <slot />
  </div>
</template>

<style scoped>
.resource-category {
  margin-bottom: 2rem;
}
.category-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--vp-c-brand-soft);
}
</style>
