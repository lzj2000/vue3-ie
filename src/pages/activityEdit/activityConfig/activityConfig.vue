<template>
    <a-form :model="form">
      <a-form-item label="活动名称：">
        <a-input v-model:value="form.name" />
      </a-form-item>
      <a-form-item label="页面标题：">
        <a-input v-model:value="form.title" />
      </a-form-item>
      <a-form-item label="活动时间：">
        <a-date-picker
          v-model="form.date"
          type="datetimerange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
        />
      </a-form-item>
    </a-form>
  </template>
  
  <script setup lang="ts">
  import { reactive, watch } from 'vue';
  
  const props = defineProps({
    updateComponentProps: { type: Function },
    name: { type: String, default: '' },
    title: { type: String, default: '' },
    date: { type: Array, default: () => [] },
  });
  
  const form = reactive({
    name: props.name,
    title: props.title,
    date: props.date,
  });
  
  watch(form, () => (props.updateComponentProps as Function)(form, 'page'));
  </script>
  
  <style lang="scss" scoped></style>
  