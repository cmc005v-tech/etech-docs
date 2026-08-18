<script setup lang="ts">
import { ref } from 'vue'

interface Question {
  q: string
  options: string[]
  answer: number
  explain?: string
}

const props = defineProps<{
  title?: string
  questions: Question[]
}>()

const picked = ref<(number | null)[]>(props.questions.map(() => null))

const pick = (qi: number, oi: number) => {
  if (picked.value[qi] !== null) return
  picked.value[qi] = oi
}

const isCorrect = (qi: number, oi: number) =>
  picked.value[qi] !== null && oi === props.questions[qi].answer

const isWrongPick = (qi: number, oi: number) =>
  picked.value[qi] === oi && oi !== props.questions[qi].answer

const answeredCount = () => picked.value.filter(p => p !== null).length
const correctCount = () =>
  props.questions.reduce((acc, q, i) => acc + (picked.value[i] === q.answer ? 1 : 0), 0)
const allAnswered = () => answeredCount() === props.questions.length

const reset = () => {
  picked.value = props.questions.map(() => null)
}
</script>

<template>
  <div class="quiz">
    <div class="quiz-header">
      <span class="quiz-title">📝 {{ title || '随堂自测' }}</span>
      <span class="quiz-progress">已答 {{ answeredCount() }} / {{ questions.length }}</span>
    </div>

    <div v-for="(q, qi) in questions" :key="qi" class="quiz-question">
      <div class="quiz-q">{{ qi + 1 }}. {{ q.q }}</div>
      <div class="quiz-options">
        <button
          v-for="(opt, oi) in q.options"
          :key="oi"
          class="quiz-option"
          :class="{ correct: isCorrect(qi, oi), wrong: isWrongPick(qi, oi) }"
          :disabled="picked[qi] !== null"
          @click="pick(qi, oi)"
        >
          <span class="quiz-letter">{{ String.fromCharCode(65 + oi) }}</span>
          <span>{{ opt }}</span>
          <span v-if="isCorrect(qi, oi)" class="quiz-mark">✔</span>
          <span v-else-if="isWrongPick(qi, oi)" class="quiz-mark">✘</span>
        </button>
      </div>
      <div v-if="picked[qi] !== null && q.explain" class="quiz-explain">
        💡 {{ q.explain }}
      </div>
    </div>

    <div v-if="allAnswered()" class="quiz-result">
      <strong>自测完成：{{ correctCount() }} / {{ questions.length }} 题正确</strong>
      <span v-if="correctCount() === questions.length"> · 全部掌握，继续下一课 🎉</span>
      <span v-else> · 建议回顾上方对应知识点后再试</span>
      <button class="quiz-reset" @click="reset">重新作答</button>
    </div>
  </div>
</template>
