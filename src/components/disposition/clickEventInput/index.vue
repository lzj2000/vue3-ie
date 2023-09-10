<template>
  <div class="click-event-input">
    <a-select v-model:value="clickEvent">
      <a-select-option v-for="item in clickEventList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
    </a-select>
    <a-form :model="form">
      <a-form-item v-show="clickEvent === 'link'">
        <a-input v-model="form.url" style="width: 220px" placeholder="请输入链接地址" />
      </a-form-item>
      <a-form-item v-show="clickEvent === 'dialog'">
        <a-input v-model="form.dialogTitle" style="width: 220px" placeholder="请输入弹窗标题" />
      </a-form-item>
      <a-form-item v-show="clickEvent === 'dialog'">
        <a-input v-model="form.dialogContent" style="width: 220px" placeholder="请输入弹窗内容" />
      </a-form-item>
    </a-form>
  </div>
</template>
  
<script setup>
import { ref, reactive, watch, watchEffect } from 'vue';
import { Assembly } from '@/store/component';
import { getCurrentComponet } from '@/common/helpers'

// 点击事件列表
const clickEventList = [
  { label: '无', value: 'none' },
  { label: '跳转链接', value: 'link' },
  { label: '弹出窗口', value: 'dialog' },
];

// 当前选中的组件
const assembly = Assembly();
const currentComponent = getCurrentComponet(assembly);

// 数据绑定
const clickEvent = ref(
  currentComponent.click ? currentComponent.click.type : 'none'
);

// 点击事件表单收集
const clickData = currentComponent.click || {};
const form = reactive(clickData);
watchEffect(() => (form.type = clickEvent.value));

// 存储表单数据到组件
watch(form, () => {
  currentComponent.click = form;
});
</script>
  
<style lang="scss" scoped>
.click-event-input {
  .ant-form {
    .ant-form-item{
      margin-bottom: 0px;
    }
    .ant-form-item-control-input-content {
      .ant-input {
        margin-top: 10px;
      }
    }
  }
}
</style>
  