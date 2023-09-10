<template>
  <a-divider />
  <a-form :model="form">
    <a-form-item label="宽度：">
      <a-input-number v-model:value="form.width" :min="0" :max="240" controls-position="right" />
      <SuffixCharacter />
    </a-form-item>
    <a-form-item label="高度：">
      <a-input-number v-model:value="form.height" :min="0" controls-position="right" />
      <SuffixCharacter />
    </a-form-item>
    <a-form-item label="对齐方式：">
      <a-radio-group v-model:value="form.align">
        <a-radio-button value="left">居左</a-radio-button>
        <a-radio-button value="center">居中</a-radio-button>
        <a-radio-button value="right">居右</a-radio-button>
      </a-radio-group>
    </a-form-item>
  </a-form>
</template>
  
<script setup>
import { nextTick, reactive, watch } from 'vue';
import { Assembly } from '@/store/component';
import { getCurrentComponet,updateComponent } from '@/common/helpers'
import SuffixCharacter from '@/components/disposition/suffixCharacter/index.vue';

const assembly = Assembly();
// 获取当前选中组件

const currentComponent = getCurrentComponet(assembly);
const ComponentStyle = currentComponent.style;

// style属性列表
const form = reactive({
  width: ComponentStyle.width || 0,
  height: ComponentStyle.height || 0,
  align: ComponentStyle.align || 'left',
});

nextTick(() => {
  // 赋值组件默认宽高
  const mark = currentComponent.mark;
  const componentDom = document.getElementsByClassName(mark)[0];
  const rawWidth = componentDom.style.width;
  const rawHeight = componentDom.style.height;
  const reg = /([0-9.]*)px/;
  form.width = Number(rawWidth.replace(reg, ($, $1) => $1));
  form.height = Number(rawHeight.replace(reg, ($, $1) => $1));
});

watch(form, () => {
  updateComponent(assembly, { newDetail: form, key: 'style' });
});
</script>
  
<style lang="scss" scoped>
.el-input {
  width: 150px;
}
</style>
  