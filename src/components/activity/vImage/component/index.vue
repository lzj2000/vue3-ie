<template>
    <div
      class="img-box"
      :style="{ width: width, height: height }"
      @click="clickChock"
    >
      <img :src="src" :style="{ width: width, height: height }" />
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    clickChock: { type: Function },
    width: { type: String, default: '240px' },
    height: { type: String, default: '150px' },
    src: {
      type: String,
      default:
        '/src/components/activity/vImage/component/vImage.jpg',
    },
  });
  </script>
  
  <style lang="scss" scoped>
  .img-box {
    font-size: 0;
    img {
      vertical-align: middle;
    }
  }
  </style>
  