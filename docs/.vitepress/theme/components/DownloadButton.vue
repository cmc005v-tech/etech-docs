<script setup lang="ts">
defineProps<{
  label?: string
  fileName: string
  fileType: 'PDF' | 'XLSX' | 'DOCX' | 'MD' | 'PPTX' | 'ZIP'
  fileSize?: string
  link: string
  external?: boolean
}>()
</script>

<template>
  <a
    class="download-btn"
    :href="link"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  >
    <span class="file-icon">📥</span>
    <span class="file-name">{{ fileName }}</span>
    <span class="file-type">{{ fileType }}</span>
    <span v-if="fileSize" class="file-size">{{ fileSize }}</span>
  </a>
</template>

<style scoped>
.file-icon {
  font-size: 1rem;
}
.file-size {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}
</style>
