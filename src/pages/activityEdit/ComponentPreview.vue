<template>
  <div class="preview-content" @drop.stop.prevent="componentDrap" @dragover.prevent>
    <ActivtiyConfig></ActivtiyConfig>
    <div v-for="item in page.components" :key="item.mark" :style="{ 'text-align': item.style.align }"
      @click="switchComponent(item)">
      <div style="display: inline-block;">
        <component :is="item.name" :class="item.mark" v-model:components="item.components" v-bind="{ ...item.detail, ...generateStyle(item.style) }"
          :clickChock="clickChock(item.click)"></component>
      </div>
    </div>
  </div>
  <a-dialog v-model="clickEventDialog" :title="clickDialogInfo.title" width="260px">
    {{ clickDialogInfo.content }}
    <template #footer>
      <a-button @click="clickEventDialog = false">确定</a-button>
    </template>
  </a-dialog>
</template>

<script setup lang="ts">
import { getComponentTemplateData, generateStyle } from '@/common/helpers';
import { Assembly } from '@/store/component';
import { isMobileEnv } from '@/utils';

import { computed, ref } from "vue";
import ActivtiyConfig from './activityConfig/index.vue';

const assembly = Assembly();
// 拖入组件
const componentDrap = (e: DragEvent) => {
  const data = e.dataTransfer!.getData('component-drag');
  const component = JSON.parse(data);
  const componentData = getComponentTemplateData({
    name: component.name,
    fullName: component.fullName,
  });
  //添加组件
  assembly.addComponent(componentData)
};

const page = computed(() => assembly.page)

//切换切换选中组件
const switchComponent = (data: { name: any; fullName: any; mark: any; }) => {
  assembly.changeCurrentComponent({
    name: data.name,
    fullName: data.fullName,
    mark: data.mark,
  });
}

// 点击事件弹窗
const clickEventDialog = ref(false);
const clickDialogInfo = ref({
  title: '默认弹窗',
  content: '默认弹窗内容',
});
// 统一处理点击事件
const clickChock = (click: { type: string; url: string; dialogTitle: any; dialogContent: any; }) => {
  // 不是移动端
  if (!isMobileEnv() || !click || click.type === 'none') return () => false;

  if (click.type === 'link' && click.url) {
    // link
    return () => (window.location.href = click.url);
  } else if (click.type === 'dialog') {
    // dialog
    return () => {
      // 弹窗出现
      clickEventDialog.value = true;
      click.dialogTitle && (clickDialogInfo.value.title = click.dialogTitle);
      click.dialogContent &&
        (clickDialogInfo.value.content = click.dialogContent);
    };
  }
};
</script>

<style lang="scss" scoped>
.preview-content {
  position: relative;
  height: 100%;
  overflow-y: auto;
  // scrollbar-width: none;
  background-color: rgb(241, 234, 234);

  &::-webkit-scrollbar {
    display: none;
  }

  .checked {
    border: 1px dashed #1890ff;
  }

  .component-container {
    overflow: hidden;
    font-size: 0;
  }
}
</style>
