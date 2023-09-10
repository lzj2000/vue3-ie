<template>
  <div class="component-setting">
    <div class="title">属性配置 - {{ fullName }}</div>
    <component
      :is="name"
      :key="currentMark"
      :updateComponentProps="updateComponentProps"
      v-bind="config"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Assembly } from '@/store/component';

const assembly = Assembly();
const name = computed(() => assembly.currentComponent.name + 'Config');
const fullName = computed(() => assembly.currentComponent.fullName);
const currentMark = computed(() => assembly.currentComponent.mark);

//获取选中组件的detail
const config = computed(() => {
  const page = assembly.page;
  const currentComponent = assembly.currentComponent;
  if (currentComponent.name === 'activity') {
    return page.detail;
  } else {
    //获取选中组件
    const component = page.components.find(
      (c) => c.mark === currentComponent.mark
    );
    const componentConfig = component?.detail || {};
    return componentConfig;
  }
});

// 注入更新配置函数
const updateComponentProps = (newDetail: any, key = 'detail') => {
  assembly.updateComponet({ newDetail, key });
};
</script>

<style lang="scss" scoped>
.component-setting {
  height: 100%;
  width: 100%;
  padding: 12px;
  font-size: 14px;
  overflow-y: auto;
  overflow-x: hidden;
  .title {
    font-weight: 500;
    font-family: Arial, Helvetica, sans-serif;
    margin-bottom: 30px;
  }
}
</style>
