<script setup>
import { computed } from 'vue'
import { cases } from '../../../cases/caseData.js'
import { deep } from '../../../cases/caseDeep.js'

const props = defineProps({
  caseId: { type: String, required: true },
})

const c = computed(() => cases.find(x => x.id === props.caseId))
const d = computed(() => deep[props.caseId])

const printHandbook = () => {
  window.print()
}
</script>

<template>
  <div v-if="c && d" class="instructor-handbook">
    <div class="handbook-header">
      <h2>📖 讲师手册：{{ c.id }} {{ c.title }}</h2>
      <button @click="printHandbook" class="print-btn">🖨️ 打印/保存PDF</button>
    </div>

    <div class="handbook-section">
      <h3>一、案例基本信息</h3>
      <table class="info-table">
        <tr><td><strong>案例编号</strong></td><td>{{ c.id }}</td></tr>
        <tr><td><strong>案例标题</strong></td><td>{{ c.title }}</td></tr>
        <tr><td><strong>案例类型</strong></td><td>{{ c.type === 'success' ? '✅ 正面成功' : c.type === 'failure' ? '❌ 反面失败' : '📊 趋势/综合' }}</td></tr>
        <tr><td><strong>所属模块</strong></td><td>{{ c.module }}</td></tr>
        <tr><td><strong>企业规模</strong></td><td>{{ c.scale }}</td></tr>
        <tr><td><strong>适配课程</strong></td><td>{{ c.course }}</td></tr>
        <tr><td><strong>案例年份</strong></td><td>{{ c.year }}</td></tr>
        <tr><td><strong>数据来源</strong></td><td>{{ c.source }}</td></tr>
      </table>
    </div>

    <div class="handbook-section">
      <h3>二、教学目标</h3>
      <ol>
        <li v-for="(obj, i) in d.objectives" :key="i">{{ obj }}</li>
      </ol>
    </div>

    <div class="handbook-section">
      <h3>三、教学时间分配（总计约 40 分钟）</h3>
      <table class="flow-table">
        <thead>
          <tr><th>环节</th><th>时长</th><th>教学动作</th></tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in d.flow" :key="i">
            <td><strong>{{ row[0] }}</strong></td>
            <td>{{ row[1] }} 分钟</td>
            <td>{{ row[2] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="handbook-section">
      <h3>四、课堂讨论题</h3>
      <ol>
        <li v-for="(q, i) in d.questions" :key="i">{{ q }}</li>
      </ol>
    </div>

    <div class="handbook-section">
      <h3>五、Quiz 答案与解析</h3>
      <div class="quiz-answers">
        <p><strong>说明：</strong>以下为随堂小测的标准答案与解析，供讲师批改参考。</p>
        <ul>
          <li><strong>Q1 正确答案：</strong>根据案例核心知识点设计，考察学员对关键概念的理解</li>
          <li><strong>Q2 正确答案：</strong>检验学员对方法论框架的掌握程度</li>
          <li><strong>Q3 正确答案：</strong>评估学员将理论应用于实际场景的能力</li>
        </ul>
        <p class="quiz-note">💡 <strong>评分建议：</strong>每题 10 分，总分 30 分。答对得满分，答错但思路正确可得 5-7 分，完全错误得 0 分。</p>
      </div>
    </div>

    <div class="handbook-section">
      <h3>六、教学延展</h3>
      <div class="extend-box">
        {{ d.extend }}
      </div>
    </div>

    <div v-if="d.field" class="handbook-section">
      <h3>七、教学实录参考</h3>
      <div class="field-box">
        {{ d.field }}
      </div>
    </div>

    <div class="handbook-footer">
      <p>📅 生成时间：{{ new Date().toLocaleDateString('zh-CN') }}</p>
      <p>📚 本手册基于案例深度教学手册自动生成，完整教案请联系课程团队获取</p>
    </div>
  </div>
  <div v-else>
    <p>未找到该案例的教学数据</p>
  </div>
</template>

<style scoped>
.instructor-handbook {
  margin: 2rem 0;
  padding: 24px;
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 12px;
  background: white;
}

.handbook-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--vp-c-divider);
}

.handbook-header h2 {
  margin: 0;
  font-size: 1.3rem;
}

.print-btn {
  padding: 8px 16px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 8px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.print-btn:hover {
  background: var(--vp-c-brand-1);
  color: white;
}

.handbook-section {
  margin-bottom: 24px;
}

.handbook-section h3 {
  font-size: 1.05rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.info-table {
  width: 100%;
  border-collapse: collapse;
}

.info-table td {
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  font-size: 0.9rem;
}

.info-table td:first-child {
  width: 120px;
  background: var(--vp-c-bg-soft);
  font-weight: 500;
}

.flow-table {
  width: 100%;
  border-collapse: collapse;
}

.flow-table th,
.flow-table td {
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
  font-size: 0.88rem;
}

.flow-table th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

.quiz-answers {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand-1);
}

.quiz-answers ul {
  margin: 12px 0;
  padding-left: 20px;
}

.quiz-answers li {
  margin-bottom: 8px;
  line-height: 1.7;
}

.quiz-note {
  margin-top: 12px;
  padding: 10px 14px;
  background: #fef3c7;
  border-radius: 6px;
  font-size: 0.88rem;
  line-height: 1.7;
}

.extend-box,
.field-box {
  padding: 14px 18px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  line-height: 1.8;
  font-size: 0.92rem;
}

.field-box {
  border-left: 4px solid var(--vp-c-green-1);
}

.handbook-footer {
  margin-top: 32px;
  padding-top: 16px;
  border-top: 2px solid var(--vp-c-divider);
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.handbook-footer p {
  margin: 6px 0;
}

/* 打印样式 */
@media print {
  .print-btn {
    display: none;
  }
  
  .instructor-handbook {
    border: none;
    padding: 0;
  }
  
  .handbook-section {
    page-break-inside: avoid;
  }
}
</style>
