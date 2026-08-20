<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  pathName: { type: String, required: true },
  pathCode: { type: String, required: true },
  totalHours: { type: Number, required: true },
  courseCount: { type: Number, required: true },
})

const STORAGE_KEY = 'course-study-progress'
const userName = ref('')
const completedDate = ref('')
const showCertificate = ref(false)
const progressData = ref({})

const certificateId = computed(() => {
  const date = completedDate.value.replace(/-/g, '')
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `CBEC-${props.pathCode}-${date}-${random}`
})

// 检查学习进度
const checkProgress = () => {
  try {
    progressData.value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    progressData.value = {}
  }
  
  // 计算当前路径的完成度
  let doneCount = 0
  const courses = getCoursesForPath(props.pathCode)
  courses.forEach(code => {
    if (progressData.value[code]) doneCount++
  })
  
  const percent = Math.round((doneCount / courses.length) * 100)
  return { doneCount, total: courses.length, percent }
}

// 获取路径对应的课程列表
const getCoursesForPath = (pathCode) => {
  const map = {
    'L1': ['L1-01', 'L1-02', 'L1-03', 'L1-04', 'L1-05', 'L1-06', 'L1-07', 'L1-08'],
    'L2A': ['L2A-01', 'L2A-02', 'L2A-03', 'L2A-04', 'L2A-05', 'L2A-06', 'L2A-07', 'L2A-08', 'L2A-09'],
    'L2B': ['L2B-01', 'L2B-02', 'L2B-03', 'L2B-04', 'L2B-05', 'L2B-06', 'L2B-07'],
    'L2C': ['L2C-01', 'L2C-02', 'L2C-03', 'L2C-04', 'L2C-05', 'L2C-06'],
  }
  return map[pathCode] || []
}

const progress = computed(() => checkProgress())
const canGenerate = computed(() => progress.value.percent >= 80)

const pathNames = {
  'L1': 'L1 必修基础层',
  'L2A': 'L2-A 运营精进路径',
  'L2B': 'L2-B 创业实战路径',
  'L2C': 'L2-C 管理升级路径',
  'L3A': 'L3-A 运营操盘手毕业项目',
  'L3B': 'L3-B 创业实战沙盘',
  'L3C': 'L3-C 战略决策模拟',
}

function generateCertificate() {
  if (!userName.value.trim()) return
  completedDate.value = new Date().toISOString().split('T')[0]
  showCertificate.value = true
}

function resetCertificate() {
  showCertificate.value = false
  userName.value = ''
  completedDate.value = ''
}

// 分享证书
async function shareCertificate() {
  const shareData = {
    title: `学习完成证书 - ${userName.value}`,
    text: `我已完戉${props.pathName}全部课程，共${props.courseCount}门课${props.totalHours}学时！`,
    url: window.location.href,
  }
  
  try {
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      // 降级方案：复制链接到剪贴板
      await navigator.clipboard.writeText(window.location.href)
      alert('证书链接已复制到剪贴板，可分享给好友！')
    }
  } catch (err) {
    console.error('分享失败:', err)
  }
}
</script>

<template>
  <div class="certificate-generator">
    <div v-if="!showCertificate" class="input-section">
      <h3>🎓 生成学习证书</h3>
      
      <!-- 进度提示 -->
      <div v-if="progress.percent < 80" class="progress-hint">
        <p>当前进度：<strong>{{ progress.doneCount }} / {{ progress.total }}</strong> 门课已完成（{{ progress.percent }}%）</p>
        <p style="font-size:0.9rem; color:#6b7280;">💡 完成度达到 80% 即可生成证书</p>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" :style="{ width: progress.percent + '%' }"></div>
        </div>
      </div>
      
      <p v-else style="color:#10b981; font-weight:600;">✅ 恭喜！您已完成 {{ progress.percent }}% 的课程，可以生成证书了！</p>
      
      <div class="input-group">
        <input
          v-model="userName"
          type="text"
          placeholder="请输入您的姓名"
          class="name-input"
          @keyup.enter="generateCertificate"
          :disabled="!canGenerate"
        />
        <button @click="generateCertificate" class="generate-btn" :disabled="!canGenerate || !userName.trim()">
          {{ canGenerate ? '生成证书' : `还需 ${Math.ceil(progress.total * 0.8) - progress.doneCount} 门课` }}
        </button>
      </div>
    </div>

    <div v-else class="certificate">
      <div class="certificate-inner">
        <div class="certificate-header">
          <div class="seal">✦</div>
          <h2>学习完成证书</h2>
          <p class="subtitle">Certificate of Completion</p>
        </div>

        <div class="certificate-body">
          <p class="recipient">兹证明</p>
          <p class="name">{{ userName }}</p>
          <p class="achievement">
            已完成 <strong>{{ pathName }}</strong> 全部课程学习
          </p>
          <div class="stats">
            <div class="stat">
              <span class="stat-value">{{ courseCount }}</span>
              <span class="stat-label">门课程</span>
            </div>
            <div class="stat">
              <span class="stat-value">{{ totalHours }}</span>
              <span class="stat-label">学时</span>
            </div>
          </div>
          <p class="date">
            完成日期：{{ completedDate }}
          </p>
          <p class="certificate-id">
            证书编号：{{ certificateId }}
          </p>
        </div>

        <div class="certificate-footer">
          <p>跨境电商高级实战系列 · 学习网站</p>
          <p class="footer-en">Cross-Border E-Commerce Advanced Practice Series</p>
        </div>
      </div>

      <div class="actions">
        <button @click="resetCertificate" class="reset-btn">重新生成</button>
        <button @click="shareCertificate" class="share-btn">📤 分享证书</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.certificate-generator {
  max-width: 600px;
  margin: 0 auto;
}

.input-section {
  text-align: center;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.input-section h3 {
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.input-section p {
  color: #64748b;
  margin-bottom: 1.5rem;
}

.progress-hint {
  background: #f0f9ff;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
  margin-bottom: 1.5rem;
}

.progress-hint p {
  margin: 4px 0;
  color: #1e293b;
}

.progress-bar-bg {
  width: 100%;
  height: 12px;
  background: #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 8px;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6 0%, #10b981 100%);
  transition: width 0.3s ease;
}

.input-group {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.name-input {
  padding: 12px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 16px;
  width: 240px;
  outline: none;
  transition: border-color 0.2s;
}

.name-input:focus {
  border-color: #3b82f6;
}

.generate-btn {
  padding: 12px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.generate-btn:hover:not(:disabled) {
  background: #2563eb;
}

.generate-btn:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.certificate {
  margin: 2rem 0;
}

.certificate-inner {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 3px solid #d97706;
  border-radius: 16px;
  padding: 3rem 2rem;
  position: relative;
  overflow: hidden;
}

.certificate-inner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(217, 119, 6, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(217, 119, 6, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.certificate-header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.seal {
  font-size: 48px;
  color: #d97706;
  margin-bottom: 0.5rem;
}

.certificate-header h2 {
  font-size: 28px;
  color: #92400e;
  margin: 0;
  font-weight: 700;
}

.subtitle {
  color: #b45309;
  font-style: italic;
  margin-top: 0.25rem;
}

.certificate-body {
  text-align: center;
  position: relative;
}

.recipient {
  color: #78350f;
  font-size: 14px;
  margin-bottom: 0.5rem;
}

.name {
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin: 0.5rem 0;
  padding: 0.5rem 0;
  border-bottom: 2px solid #d97706;
  display: inline-block;
  min-width: 200px;
}

.achievement {
  color: #44403c;
  font-size: 16px;
  margin: 1rem 0;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 1.5rem 0;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 36px;
  font-weight: 700;
  color: #d97706;
}

.stat-label {
  display: block;
  font-size: 14px;
  color: #78350f;
  margin-top: 0.25rem;
}

.date {
  color: #57534e;
  font-size: 14px;
  margin-top: 1rem;
}

.certificate-id {
  color: #78716c;
  font-size: 12px;
  font-family: monospace;
  margin-top: 0.5rem;
}

.certificate-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(217, 119, 6, 0.3);
  position: relative;
}

.certificate-footer p {
  color: #92400e;
  font-weight: 600;
  margin: 0;
}

.footer-en {
  color: #b45309;
  font-size: 12px;
  font-style: italic;
  margin-top: 0.25rem !important;
}

.actions {
  text-align: center;
  margin-top: 1.5rem;
  display: flex;
  gap: 12px;
  justify-content: center;
}

.reset-btn {
  padding: 10px 20px;
  background: white;
  border: 1px solid #d97706;
  color: #d97706;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.reset-btn:hover {
  background: #fef3c7;
}

.share-btn {
  padding: 10px 20px;
  background: #3b82f6;
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.share-btn:hover {
  background: #2563eb;
}
</style>
