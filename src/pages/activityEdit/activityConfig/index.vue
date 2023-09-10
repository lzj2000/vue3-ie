<template>
    <div class="topStateBar">
      <img src="@/assets/image/topBar.jpg" alt="" />
      <div class="activity-header" @click="openActivityConfig(assembly)">
        <left-outlined class="icon" />
        {{ title }}
      </div>
    </div>
  </template>
  
  <script setup>
  import {
    LeftOutlined
} from '@ant-design/icons-vue';
  import { computed } from 'vue';
  import { Assembly } from '@/store/component';
  import { openActivityConfig } from '@/common/helpers';
  
  const assembly = Assembly();
  const title = computed(() => assembly.page.detail.title);
  </script>
  
  <style lang="scss" scoped>
  .topStateBar {
    font-size: 0;
    background: rgb(246, 246, 246);
    img {
      width: 100%;
    }
    .activity-header {
      height: 22px;
      line-height: 22px;
      position: relative;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
      .icon {
        position: absolute;
        left: 4px;
        top: 5px;
      }
    }
  }
  </style>
  