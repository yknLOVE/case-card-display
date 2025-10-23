<template>
  <div class="search-bar">
    <input class="search-input" type="text" :placeholder="placeholder" v-model="localValue" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '搜索案例名称、负责人、学校...' }
})
const emit = defineEmits(['update:modelValue'])
const localValue = ref(props.modelValue)

watch(() => props.modelValue, v => { if (v !== localValue.value) localValue.value = v })
watch(localValue, v => emit('update:modelValue', v))
</script>

<style scoped>
.search-bar { width: 100%; }
.search-input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  background: #fff;
}
</style>