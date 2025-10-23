<template>
  <div class="loading-skeleton">
    <div class="skeleton-card">
      <div class="skeleton-thumbnail"></div>
      <div class="skeleton-content">
        <div class="skeleton-title"></div>
        <div class="skeleton-subtitle"></div>
        <div class="skeleton-tags">
          <div class="skeleton-tag"></div>
          <div class="skeleton-tag"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.loading-skeleton {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skeleton-card {
  display: flex;
  background: #f0f0f0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.skeleton-thumbnail {
  width: 100px;
  height: 80px;
  background: #e0e0e0;
  border-radius: 4px;
  margin-right: 16px;
}

.skeleton-content {
  flex: 1;
}

.skeleton-title {
  height: 20px;
  background: #e0e0e0;
  margin-bottom: 8px;
  border-radius: 4px;
}

.skeleton-subtitle {
  height: 16px;
  background: #e0e0e0;
  margin-bottom: 8px;
  border-radius: 4px;
}

.skeleton-tags {
  display: flex;
  gap: 8px;
}

.skeleton-tag {
  height: 16px;
  width: 60px;
  background: #e0e0e0;
  border-radius: 4px;
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.skeleton-card {
  background: #fff;
  padding: 12px;
  border-radius: 8px;
  min-height: 260px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
}

.s-thumb {
  height: 140px;
  background: linear-gradient(90deg, #eee, #f7f7f7, #eee);
  border-radius: 6px;
  margin-bottom: 10px;
}

.s-line {
  height: 12px;
  background: #eee;
  border-radius: 6px;
  margin-bottom: 8px;
}

.s-line.short {
  width: 40%;
}

.s-line.long {
  width: 80%;
}

@media (max-width: 1000px) {
  .skeleton-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .skeleton-grid {
    grid-template-columns: 1fr;
  }
}
</style>