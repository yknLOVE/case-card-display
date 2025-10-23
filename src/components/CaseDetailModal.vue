<template>
  <div class="modal" v-if="caseData" @click.self="close">
    <div class="modal-content">
      <button class="close" @click="close">×</button>
      <div class="detail-grid">
        <img :src="caseData.thumbnail || placeholder" class="detail-thumb" />
        <div class="detail-info">
          <h2>{{ caseData.title }}</h2>
          <div class="meta-row">
            <span>负责人：{{ caseData.owner }}</span>
            <span>学校：{{ caseData.school }}</span>
          </div>
          <div class="tags">
            <span v-for="t in caseData.tags || []" :key="t" class="tag">{{ t }}</span>
          </div>
          <p class="desc">{{ caseData.description }}</p>
          <div class="meta-bottom">
            <span>浏览：{{ caseData.views ?? 0 }}</span>
            <span>点赞：{{ caseData.likes ?? 0 }}</span>
            <span>评论：{{ caseData.comments ?? 0 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CaseItem } from '../composables/useFetchCases'
const props = defineProps<{ caseData: CaseItem | null }>()
const emit = defineEmits(['close'])
const placeholder = '/images/placeholder.png'
function close() { emit('close') }
</script>

<style scoped>
.modal {
  position: fixed; inset: 0; display:flex; align-items:center; justify-content:center;
  background: rgba(0,0,0,0.45); z-index:2000;
}
.modal-content {
  width: 90%; max-width: 960px; background:#fff; padding:18px; border-radius:8px; position:relative;
}
.close { position:absolute; right:12px; top:12px; border:none; background:transparent; font-size:22px; cursor:pointer; }
.detail-grid { display:flex; gap:16px; align-items:flex-start; }
.detail-thumb { width:320px; height:220px; object-fit:cover; border-radius:6px; }
.detail-info h2 { margin:0 0 8px; }
.meta-row { color:#666; font-size:13px; display:flex; gap:12px; margin-bottom:8px; }
.tags { margin-bottom:8px; display:flex; gap:6px; flex-wrap:wrap; }
.tag { background:#f3f4f6; padding:4px 8px; border-radius:12px; font-size:12px; color:#666; }
.desc { color:#444; line-height:1.6; }
.meta-bottom { margin-top:12px; color:#888; display:flex; gap:14px; font-size:13px; }
@media (max-width:800px){ .detail-grid { flex-direction:column } .detail-thumb { width:100%; height:200px } }
</style>