<template>
  <section v-if="enabled" class="comments-block">
    <h2 class="comments-title">💬 讨论区</h2>
    <p class="comments-hint">
      基于 GitHub Discussions 的免费评论区：登录 GitHub 即可发言，支持 Markdown 排版与回复串。
      你的每条提问与经验都会沉淀为可检索的讨论帖，方便后来学员复用。
    </p>
    <div ref="mountEl" class="comments-mount"></div>
  </section>

  <section v-else class="comments-block">
    <h2 class="comments-title">💬 讨论区</h2>
    <p class="comments-hint">
      本站评论区基于 <strong>Giscus</strong>（GitHub Discussions）免费接入：无自建服务器、无数据库、无需审核成本，
      完成一次配置即可永久使用。
    </p>
    <div class="comments-guide">
      <ol>
        <li>在 GitHub 仓库启用 Discussions：<code>仓库 Settings → Features → 勾选 Discussions</code></li>
        <li>安装 <a href="https://github.com/apps/giscus" target="_blank" rel="noopener">Giscus App</a>，授权到目标仓库</li>
        <li>打开 <a href="https://giscus.app" target="_blank" rel="noopener">giscus.app</a>，填入仓库名并选择分类，复制生成的
          <code>data-repo</code> / <code>data-repo-id</code> / <code>data-category</code> / <code>data-category-id</code> 四项</li>
        <li>将四项填入 <code>docs/.vitepress/config.ts</code> 的 <code>themeConfig.comments.giscus</code>（见下方示例）</li>
        <li>重新构建部署后，本区块即变为真实评论区</li>
      </ol>
      <p class="comments-guide-code-title">配置示例：</p>
      <pre class="comments-guide-code"><code>comments: {
  provider: 'giscus',            // 'giscus' 或 'utterances'
  giscus: {
    repo: 'your-name/your-repo', // 你的仓库，形如 owner/repo
    repoId: 'R_kgDOxxxxxxxx',
    category: 'Announcements',   // 与 giscus.app 中选择的分类一致
    categoryId: 'DIC_kwDOxxxxxxxx',
    mapping: 'pathname',         // 按页面路径映射讨论帖
    lang: 'zh-CN',
  },
},</code></pre>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const { theme, isDark } = useData()
const route = useRoute()
const mountEl = ref<HTMLDivElement>()

const comments = computed(() => (theme.value.comments ?? {}) as Record<string, any>)
const provider = computed(() => comments.value.provider ?? 'giscus')
const giscus = computed(() => comments.value.giscus ?? {})
const utterances = computed(() => comments.value.utterances ?? {})

// 配置齐全才启用真实评论区；未配置时展示接入引导
const enabled = computed(() => {
  if (provider.value === 'utterances') return Boolean(utterances.value.repo)
  return Boolean(giscus.value.repo && giscus.value.repoId && giscus.value.categoryId)
})

let loadedForPath = ''

function clearMount() {
  if (mountEl.value) mountEl.value.innerHTML = ''
}

function loadComments() {
  clearMount()
  if (provider.value === 'utterances') loadUtterances()
  else loadGiscus()
}

// Giscus：动态加载 client.js（每次创建新 script 节点，保证重新执行）
function loadGiscus() {
  const cfg = giscus.value
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('data-repo', cfg.repo)
  script.setAttribute('data-repo-id', cfg.repoId)
  script.setAttribute('data-category', cfg.category || 'Announcements')
  script.setAttribute('data-category-id', cfg.categoryId)
  script.setAttribute('data-mapping', cfg.mapping || 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  script.setAttribute('data-lang', cfg.lang || 'zh-CN')
  mountEl.value?.appendChild(script)
}

// Utterances 备选方案
function loadUtterances() {
  const cfg = utterances.value
  const script = document.createElement('script')
  script.src = 'https://utteranc.es/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('repo', cfg.repo)
  script.setAttribute('issue-term', cfg.issueTerm || 'pathname')
  script.setAttribute('theme', isDark.value ? 'github-dark' : 'github-light')
  mountEl.value?.appendChild(script)
}

// 站点亮/暗主题切换时，同步评论区主题（iframe 加载有延迟，带重试）
function sendThemeMessage(dark: boolean, retries = 8) {
  if (provider.value === 'utterances') {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.utterances-frame')
    if (iframe) {
      iframe.contentWindow?.postMessage(
        { type: 'set-theme', theme: dark ? 'github-dark' : 'github-light' },
        'https://utteranc.es',
      )
    } else if (retries > 0) {
      setTimeout(() => sendThemeMessage(dark, retries - 1), 400)
    }
    return
  }
  const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
  if (iframe) {
    iframe.contentWindow?.postMessage(
      { giscus: { setConfig: { theme: dark ? 'dark' : 'light' } } },
      'https://giscus.app',
    )
  } else if (retries > 0) {
    setTimeout(() => sendThemeMessage(dark, retries - 1), 400)
  }
}

onMounted(() => {
  if (enabled.value) {
    loadedForPath = route.path
    loadComments()
  }
})

// SPA 路由切换时重载评论区（giscus 按 pathname 映射讨论帖）
watch(
  () => route.path,
  (path) => {
    if (enabled.value && path !== loadedForPath) {
      loadedForPath = path
      loadComments()
    }
  },
)

watch(isDark, (dark) => sendThemeMessage(dark))

onBeforeUnmount(() => {
  clearMount()
})
</script>
