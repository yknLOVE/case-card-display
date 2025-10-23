<template>
  <section class="cases">

    <!-- 原有内容保持不变 -->
    <div class="controls">
      <SearchBar v-model="searchQuery" />
      <!-- ...其余控件... -->
    </div>

    <LoadingSkeleton v-if="loading" />
    <EmptyState v-else-if="filtered && filtered.length === 0" />

    <div v-else class="grid">
      <CaseCard
        v-for="c in filtered"
        :key="c.id"
        :case-data="c"
        @open="openDetail"
      />
    </div>

    <CaseDetailModal v-if="selected" :case-data="selected" @close="selected=null" />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, type Ref } from 'vue'
import SearchBar from './SearchBar.vue'
import CaseCard from './CaseCard.vue'
import CaseDetailModal from './CaseDetailModal.vue'
import EmptyState from './EmptyState.vue'
import LoadingSkeleton from './LoadingSkeleton.vue'
import { useFetchCases, type CaseItem } from '../composables/useFetchCases'
import { useSearch } from '../composables/useSearch'

const { cases, loading } = useFetchCases()
const casesRef = cases as Ref<CaseItem[]>

const searchQuery = ref<string>('')
const category = ref<string>('')
const topic = ref<string>('')
const sortBy = ref<'new'|'hot'|'score'>('new')
const selected = ref<CaseItem|null>(null)

const filtered = useSearch(casesRef, searchQuery)

// 日志：组件挂载与变化时打印，便于定位
onMounted(() => console.log('[CaseList] mounted', { loading: loading.value, cases: casesRef.value }))
watch([casesRef, loading, searchQuery], () => {
  console.log('[CaseList] state', { loading: loading.value, casesLen: casesRef.value.length, search: searchQuery.value })
})

function openDetail(item: CaseItem) { selected.value = item }
</script>

<style scoped>
.case-list {
  padding: 20px;
}

.case-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.cases { max-width:1200px; margin: 0 auto; padding: 12px; box-sizing: border-box; }

/* 使用 auto-fill + minmax 自动填满可用宽度，避免大屏右侧空白 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px;
  width: 100%;
  align-items: start;
}

/* skeleton 与 grid 保持一致 */
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px;
}

/* 控件区域响应式 */
.controls { display:flex; gap:12px; align-items:center; margin-bottom:14px; flex-wrap:wrap; }
.selectors { display:flex; gap:8px; align-items:center; }

/* 小屏幕断点 */
@media (max-width:1000px){
  .grid, .skeleton-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width:640px){
  .grid, .skeleton-grid { grid-template-columns: 1fr; }
  .controls { flex-direction:column; align-items:stretch; }
}
</style>