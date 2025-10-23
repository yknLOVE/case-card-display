<template>
  <article class="case-card" @click="open">
    <div class="thumb-wrap">
      <img :src="caseData.thumbnail || placeholder" alt="thumb" class="thumb" />
      <span v-if="caseData.badge" class="badge">{{ caseData.badge }}</span>
    </div>

    <div class="card-body">
      <h3 class="title">{{ caseData.title }}</h3>
      <p class="desc">{{ caseData.description }}</p>

      <div class="meta">
        <div class="meta-left">
          <div class="owner">{{ caseData.owner }}</div>
          <div class="school">{{ caseData.school }}</div>
        </div>
        <div class="rating">
          <span class="stars" v-html="starHtml"></span>
          <span class="score">{{ (caseData.score ?? 4.5).toFixed(1) }}</span>
        </div>
      </div>

      <div class="tags">
        <span v-for="t in caseData.tags || []" :key="t" class="tag">{{ t }}</span>
      </div>

      <div class="stats">
        <span>👁 {{ caseData.views ?? 0 }}</span>
        <span>💬 {{ caseData.comments ?? 0 }}</span>
        <span>👍 {{ caseData.likes ?? 0 }}</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CaseItem } from '../composables/useFetchCases'

const props = defineProps<{ caseData: CaseItem }>()
const emit = defineEmits(['open'])

const placeholder = '/images/placeholder.png'

function open() {
  emit('open', props.caseData)
}

const starHtml = computed(() => {
  const score = Math.round((props.caseData.score ?? 4.5))
  return '★'.repeat(score) + '☆'.repeat(5 - score)
})
</script>

<style scoped>
.case-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(20,20,40,0.06);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.thumb-wrap { position: relative; }
.thumb {
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
}
.badge {
  position: absolute;
  right: 10px;
  top: 10px;
  background: #ffd042;
  color: #2b2b2b;
  padding: 6px 8px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
}
.card-body { padding: 12px 14px; display:flex; flex-direction:column; gap:8px; flex:1; }
.title { font-size: 16px; margin: 0 0 4px; line-height:1.3; height: 40px; overflow:hidden; }
.desc { margin:0; color:#666; font-size:13px; height:36px; overflow:hidden; }
.meta { display:flex; justify-content:space-between; align-items:center; margin-top:6px; }
.owner, .school { font-size:12px; color:#888; }
.rating { display:flex; align-items:center; gap:6px; font-size:13px; color:#f6b01e; }
.tags { margin-top:8px; display:flex; gap:6px; flex-wrap:wrap; }
.tag { background:#f3f4f6; padding:4px 8px; border-radius:12px; font-size:12px; color:#666; }
.stats { margin-top:auto; display:flex; gap:12px; color:#999; font-size:12px; align-items:center; }
</style>