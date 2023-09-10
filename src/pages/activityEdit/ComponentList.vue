<template>
  <a-collapse v-model:activeName="activeName">
    <a-collapse-panel v-for="item in categoryList" :key="item.id" :header="item.name">
      <div class="component-box">
        <div class="component-item" v-for="item1 in item.componentList" :key="item1.id" draggable="true"
          @dragstart="dragStart($event, item1)">
          <img :src="item1.path" />
          <span>{{ item1.full_name }}</span>
        </div>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>
<script lang="ts" setup>
import { RootObject } from './tyoe';


const activeName = ['基础组件'];
const categoryList = [
  {
    id: 1, name: '基础组件', componentList: [
      {
        id: 1,
        name: 'vButton',
        full_name: '按钮',
        path: 'src/assets/按钮.png',
      }, {
        id: 2,
        name: 'vText',
        full_name: '文字',
        path: 'src/assets/文字.png',
      }, {
        id: 3,
        name: 'vImage',
        full_name: '图片',
        path: 'src/assets/图片.png',
      }
    ]
  },
  {
    id: 2, name: '容器组件', componentList: [
      {
        id: 1,
        name: 'Carrier',
        full_name: '背景',
        path: 'src/assets/按钮.png',
      }
    ]
  },
];

const dragStart = (e: DragEvent, item: RootObject) => {
  const transferData = {
    name: item.name,
    fullName: item.full_name,
  };
  e.dataTransfer?.setData('component-drag', JSON.stringify(transferData));
}
</script>

<style lang="scss" scoped>
.el-collapse-item {
  padding-left: 12px;

  :deep(.el-collapse-item__header) {
    font-weight: 600;
  }
}

.component-box {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  padding-left: 20px;

  .component-item {
    width: 64px;
    height: 86px;
    text-align: center;
    font-size: 0;

    img {
      width: 64px;
      height: 64px;
    }

    span {
      font-family: 'Microsoft YaHei';
      font-size: 13px;
    }
  }
}
</style>
