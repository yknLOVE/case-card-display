<script setup lang="ts">
import { ref, type Ref } from 'vue'
import SearchBar from './SearchBar.vue'
import CaseList from './CaseList.vue'
import CaseDetailModal from './CaseDetailModal.vue'
import EmptyState from './EmptyState.vue'
import LoadingSkeleton from './LoadingSkeleton.vue'
import { useFetchCases, type CaseItem } from '../composables/useFetchCases.ts'
import { useSearch } from '../composables/useSearch.ts'

// 直接按 composable 的返回值解构，保持正确类型
const { cases, loading } = useFetchCases()

// 明确 cases 类型为 Ref<CaseItem[]> 或 数组
const casesRef = cases as Ref<CaseItem[]> || []
const isLoading = loading

const searchQuery = ref<string>('')
const selectedCase = ref<CaseItem | null>(null)

// 现在类型匹配：useSearch 接受 Ref<CaseItem[]> 或 数组
const filteredCases = useSearch(casesRef, searchQuery)

function openDetailModal(caseItem: CaseItem) {
  selectedCase.value = caseItem
}
</script>

<template>
  <header class="hero">
    <div class="hero-inner">
      <nav class="top-nav">
        <div class="logo">课程思政案例展示平台</div>
        <ul class="nav-links">
          <li>首页</li>
          <li class="active">案例展示</li>
          <li>数据统计</li>
        </ul>
      </nav>

      <div class="hero-content">
        <h1>案例展示</h1>
        <p>探索优质课程思政案例，学习先进教学经验</p>
      </div>
    </div>
  </header>

  <div class="case-list-view">

    <LoadingSkeleton v-if="isLoading" />
    <EmptyState v-if="!isLoading && filteredCases.length === 0" />
    <CaseList
      v-if="!isLoading && filteredCases.length > 0"
      :cases="filteredCases"
      @case-click="openDetailModal"
    />
    
    <CaseDetailModal
      v-if="selectedCase"
      :case="selectedCase"
      @close="selectedCase = null"
    />
  </div>
</template>

<style scoped>
/* Full-bleed hero：无论父容器如何限制，都让背景横跨整屏 */
.hero {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw; /* 抵消视口宽度偏移 */
  margin-right: -50vw;
  width: 100vw;       /* 使背景跨满视口宽度 */
  background: linear-gradient(180deg,#6b5bff 0%, #8a6ef6 100%);
  color: #fff;
  padding: 40px 0;    /* 上下内边距，左右由内层控制 */
  box-sizing: border-box;
}

/* 内层限制宽度并居中（页面内容不超宽） */
.hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
}

/* 保持原有导航与文本样式 */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
.logo { font-weight: 700; font-size: 18px; }
.nav-links { list-style: none; display: flex; gap: 18px; padding: 0; margin: 0; color: rgba(255,255,255,0.95); }
.nav-links li { cursor: pointer; opacity: 0.9; }
.nav-links li.active { border-bottom: 2px solid rgba(255,255,255,0.9); padding-bottom: 6px; }
.hero-content { text-align: center; padding: 20px 0 8px; }
.hero h1 { margin: 0; font-size: 36px; font-weight: 600; }
.hero p { margin: 8px 0 0; opacity: 0.95; }

@media (max-width: 720px){
  .hero h1 { font-size: 24px; }
  .top-nav { flex-direction: column; gap: 8px; align-items: flex-start; }
}
</style>