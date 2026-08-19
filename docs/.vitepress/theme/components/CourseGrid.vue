<script setup>
defineProps({
  columns: { type: [Number, String], default: 0 },
  items: { type: Array, default: () => [] },
})
</script>

<template>
  <div class="course-grid" :style="columns ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : undefined">
    <div v-for="(item, idx) in items" :key="idx" class="stat-card" :class="`stat-${item.color || 'blue'}`">
      <div class="stat-value">{{ item.value }}</div>
      <div class="stat-label">{{ item.label }}</div>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.stat-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.25rem 1rem;
  text-align: center;
  background: var(--vp-c-bg);
  transition: all 0.25s ease;
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.stat-value {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.stat-blue .stat-value { color: #3b82f6; }
.stat-green .stat-value { color: #10b981; }
.stat-red .stat-value { color: #ef4444; }
.stat-purple .stat-value { color: #8b5cf6; }
.stat-orange .stat-value { color: #f59e0b; }
</style>
