<script setup lang="ts">
interface ResourceItem {
  name: string
  type: string
  size?: string
  description?: string
  link: string
}

defineProps<{
  items: ResourceItem[]
}>()
</script>

<template>
  <table class="resource-table">
    <thead>
      <tr>
        <th>资源名称</th>
        <th>类型</th>
        <th v-if="items.some(i => i.description)">简介</th>
        <th>大小</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.name">
        <td>{{ item.name }}</td>
        <td><span class="type-badge">{{ item.type }}</span></td>
        <td v-if="items.some(i => i.description)">{{ item.description || '—' }}</td>
        <td>{{ item.size || '—' }}</td>
        <td>
          <a class="download-link" :href="item.link" :download="item.name">
            📥 下载
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.type-badge {
  display: inline-block;
  font-size: 0.75rem;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
.download-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
}
.download-link:hover {
  text-decoration: underline;
}
</style>
