<script setup lang="ts">
defineProps<{
  title: string
  defaultOpen?: boolean
}>()
</script>

<template>
  <details class="faq-item" :open="defaultOpen || false">
    <summary>{{ title }}</summary>
    <div class="faq-answer">
      <slot />
    </div>
  </details>
</template>
