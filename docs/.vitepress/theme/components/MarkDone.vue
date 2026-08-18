<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  id: string
  title: string
}>()

const STORAGE_KEY = 'course-study-progress'
const done = ref(false)

const load = () => {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    done.value = !!data[props.id]
  } catch {
    done.value = false
  }
}

const toggle = () => {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    if (done.value) {
      delete data[props.id]
    } else {
      data[props.id] = { title: props.title, at: new Date().toISOString().slice(0, 10) }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    done.value = !done.value
  } catch {
    /* localStorage 不可用时静默降级 */
  }
}

onMounted(load)
</script>

<template>
  <button class="mark-done" :class="{ 'mark-done--active': done }" @click="toggle">
    <span class="mark-done-icon">{{ done ? '✅' : '☐' }}</span>
    {{ done ? '已完成本课（点击取消标记）' : '标记本课为已完成' }}
  </button>
</template>
