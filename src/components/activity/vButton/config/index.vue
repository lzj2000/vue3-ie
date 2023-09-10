<template>
  <a-form :model="form">
    <a-form-item label="按钮文字：">
      <a-input v-model:value="form.content" style="width: 230px" />
    </a-form-item>
    <a-form-item label="字体颜色：">
      <ColorPicker v-model="form.color"></ColorPicker>
    </a-form-item>
    <a-form-item label="背景颜色：">
      <ColorPicker v-model="form.backgroundColor"></ColorPicker>
    </a-form-item>
    <a-form-item label="按钮圆角：">
      <BaseInput v-model="form.borderRadius" />
    </a-form-item>
    <a-form-item label="点击事件：">
      <ClickEventInput />
    </a-form-item>
  </a-form>
  <BaseSetting></BaseSetting>
</template>
  
<script setup>
import { reactive, watch } from 'vue';
import BaseSetting from '@/components/disposition/baseSetting/index.vue';
import ColorPicker from '@/components/disposition/colorPicker/index.vue';
import BaseInput from '@/components/disposition/baseInput/index.vue';
import ClickEventInput from '@/components/disposition/clickEventInput/index.vue';

const props = defineProps({
  updateComponentProps: { type: Function },
  color: { type: String, default: '#fff' },
  backgroundColor: { type: String, default: '#409EFF' },
  borderRadius: { type: String, default: '4px' },
  content: { type: String, default: '按钮' },
});

const form = reactive({
  content: props.content,
  color: props.color,
  borderRadius: props.borderRadius,
  backgroundColor: props.backgroundColor,
});

watch(form, () => {
  props.updateComponentProps(form);
});
</script>
  
<style lang="scss" scoped></style>
  