<template>
  <a-form :model="form">
    <a-form-item label="排列规则：">
      <a-radio-group v-model:value="form.type">
        <a-radio value="free">自由画布</a-radio>
        <a-radio value="normal">垂直画布</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="背景颜色：">
      <ColorPicker v-model="form.backgroundColor"></ColorPicker>
    </a-form-item>
  </a-form>
  <BaseSetting></BaseSetting>
</template>

  
<script setup>
import { reactive, watch } from 'vue';
import BaseSetting from '@/components/disposition/baseSetting/index.vue';
import ColorPicker from '@/components/disposition/colorPicker/index.vue';

const props = defineProps({
  updateComponentProps: { type: Function },
  type: { type: String, default: 'free' },
  backgroundColor: { type: String, default: '#EBF29D' },
});

const form = reactive({
  type: props.type,
  backgroundColor: props.backgroundColor,
});

watch(form, () => {
  props.updateComponentProps(form);
});
</script>
  
<style lang="scss" scoped></style>
  