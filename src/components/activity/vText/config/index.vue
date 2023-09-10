<template>
    <a-form :model="form">
      <a-form-item label="文字内容：">
        <a-input
          v-model:value="form.content"
          style="width: 230px"
          placeholder="请输入内容"
        />
      </a-form-item>
      <a-form-item label="字体颜色：">
        <ColorPicker v-model:value="form.color" />
      </a-form-item>
      <a-form-item label="字体大小：">
        <BaseInput v-model:value="form.fontSize" />
      </a-form-item>
    </a-form>
    <BaseSetting></BaseSetting>
  </template>
  
  <script setup>
  import { reactive, watch } from 'vue';
  import BaseSetting from '@/components/disposition/baseSetting/index.vue';
  import ColorPicker from '@/components/disposition/colorPicker/index.vue';
  import BaseInput from '@/components/disposition/baseInput/index.vue';
  
  const props = defineProps({
    updateComponentProps: { type: Function },
    content: { type: String, default: '' },
    color: { type: String, default: '#000' },
    fontSize: { type: String, default: '16px' },
  });
  
  const form = reactive({
    content: props.content,
    color: props.color,
    fontSize: props.fontSize,
  });
  
  watch(form, () => {
    props.updateComponentProps(form);
  });
  </script>
  
  <style lang="scss" scoped></style>
  