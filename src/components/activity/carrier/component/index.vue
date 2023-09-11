<template>
  <div class="carrier" :style="carrierStyle" @drop.stop="componentDrap" @dragover.prevent>
    <div v-for="component in components" :key="component.mark" :class="{ checked: component.mark === currentMark }"
    :style="{
        ...componentWrapperStyle(component.style),
        'text-align': component.style.align
      }" @click.stop="switchComponent(component)">
      <div style="display: inline-block;">
        <component :is="component.name" :class="component.mark" v-bind="{
        ...component.detail,
        ...generateStyle(component.style),
      }" :clickChock="(component) => clickChock(component.click)"></component>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { computed } from 'vue';
import { selectComponent, generateStyle, getComponentTemplateData } from '@/common/helpers';
import { Assembly } from '@/store/component';

const props = defineProps({
  clickChock: { type: Function, default: () => { } },
  components: { type: Array, default: () => [] },
  width: { type: String, default: '240px' },
  height: { type: String, default: '200px' },
  type: { type: String, default: 'free' },
  backgroundColor: { type: String, default: '#EBF29D' },
});

// 容器style
const carrierStyle = computed(() => {
  return {
    width: props.width,
    height: props.height,
    backgroundColor: props.backgroundColor,
  };
});

// 组件包装style
const componentWrapperStyle = (componentStyle) => {
  console.log(componentStyle);
  const componentFreeStyle = {
    position: 'absolute',
    left: '0px'
  };
  if(componentStyle.align == 'center'){
    componentFreeStyle.left = calculateDifference(props.width,componentStyle.width,2)
  }else if(componentStyle.align == 'right'){
    componentFreeStyle.left = calculateDifference(props.width,componentStyle.width,1)
  }
  return props.type === 'free' ? componentFreeStyle : { };
};
const calculateDifference = (value1, value2,num) =>{
  // 将值1和值2都转换为像素值（如果它们是字符串的话）
  const pixelValue1 = typeof value1 === 'string' ? parseInt(value1, 10) : value1;
  const pixelValue2 = typeof value2 === 'string' ? parseInt(value2, 10) : value2;

  // 计算差值并将其转换为带有 'px' 单位的字符串
  const difference = (pixelValue1 - pixelValue2)/num;
  const result = difference + 'px';

  return result;
}

const emit = defineEmits(['update:components']);
// 元素拖入carrier组件
const componentDrap = (e) => {
  const data = e.dataTransfer.getData('component-drag');
  const component = JSON.parse(data);
  const componentData = getComponentTemplateData({
    name: component.name,
    fullName: component.fullName,
  });
  // 组件数据添加到容器components
  emit('update:components', [...props.components, componentData]);
};

const store = Assembly();
const currentMark = computed(() => store.currentComponent.mark);
// 选中组件
const switchComponent = (component) => {
  selectComponent(store, component);
};
</script>
  
<style lang="scss" scoped>
.carrier {
  position: relative;
  font-size: 12px;
  overflow: hidden;
}

.checked {
  border: 1px dashed #1890ff;
}
</style>