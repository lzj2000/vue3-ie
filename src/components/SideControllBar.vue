<template>
    <div class="side-controll-bar">
        <up-outlined  class="icon" @click="move('up')" />
        <down-outlined class="icon" @click="move('down')" />
        <plus-outlined class="icon" @click="copy" />
        <delete-outlined class="icon" @click="del" />
    </div>
</template>
  
<script setup>
  import {
    UpOutlined,
    DownOutlined,
    PlusOutlined,
    DeleteOutlined
} from '@ant-design/icons-vue';
import { computed, reactive, watchEffect } from 'vue';
import { Assembly } from '@/store/component';
import {
    getCurrentComponetIndex,
    openActivityConfig,
    getContainerComponet,
} from '@/common/helpers';

const store = Assembly();
const components = computed(() => store.page.components);
const currentComponent = computed(() => store.currentComponent);

// 是否已选中组件
const checked = computed(() => {
    const mark = currentComponent.value.mark;
    if (mark && !mark.startsWith('activity-')) return true;
    return false; 
});

// icon动态样式
const elIconStyle = reactive({});
watchEffect(() => {
    if (checked.value) {
        elIconStyle.cursor = 'pointer';
        elIconStyle.color = '#000';
        elIconStyle.hoverColor = 'rgb(62, 144, 211)';
    } else {
        elIconStyle.cursor = 'not-allowed';
        elIconStyle.color = '#aaa';
        elIconStyle.hoverColor = '#aaa';
    }
});

// 返回选中组件的索引
const curCompIdx = () => {
    if (!checked.value) return -1;
    const curCompIdx = getCurrentComponetIndex(store);
    return curCompIdx;
};

const move = (type) => {
    // 当前选中的组件数组索引
    let idx = curCompIdx();
    let compLen = components.value.length;
    let containerComponents = null;

    if (idx < 0) {
        // 容器中进行组件操作
        const containerInfo = getContainerComponet(store);
        const container = containerInfo.container;
        idx = getCurrentComponetIndex(store, container.components);

        compLen = container.components.length;
        containerComponents = container.components;
    }

    if (type === 'up') {
        // 向上移动
        if (idx === 0) return;
        else {
            store.swapComponent({
                orange: idx,
                target: idx - 1,
                containerComponents,
            });
        }
    } else {
        // 向下移动
        if (idx === compLen - 1) return;
        else {
            store.swapComponent({
                orange: idx,
                target: idx + 1,
                containerComponents,
            });
        }
    }
};

const copy = () => {
    // 当前选中的组件数组索引
    let idx = curCompIdx();
    let componentData = JSON.parse(JSON.stringify(components.value[idx]));
    let containerComponents = null;

    if (idx < 0) {
        // 容器中进行组件操作
        const containerInfo = getContainerComponet(store);
        const container = containerInfo.container;
        idx = getCurrentComponetIndex(store, container.components);

        componentData = JSON.parse(JSON.stringify(container.components[idx]));
        containerComponents = container.components;
    }

    // 更新mark
    componentData.mark = componentData.name + '-' + Date.now();
    store.insertComponent({
        i: idx + 1,
        componentData,
        containerComponents,
    });
};
const del = () => {
    // 当前选中的组件数组索引
    let idx = curCompIdx();
    let containerComponents = null;

    if (idx < 0) {
        // 容器中进行组件操作
        const containerInfo = getContainerComponet(store);
        const container = containerInfo.container;
        idx = getCurrentComponetIndex(store, container.components);

        containerComponents = container.components;
    }

    store.deleteComponent({ i: idx, containerComponents });

    openActivityConfig(store);
};
</script>
  
<style lang="scss" scoped>
.side-controll-bar {
    position: absolute;
    top: 35%;
    right: -32px;
    width: 36px;
    box-sizing: border-box;
    padding: 8px;
    border-radius: 4px;
    background: #eee;

    .icon:not(:first-child) {
        margin-top: 8px;
    }

    .icon {
        cursor: v-bind('elIconStyle.cursor');
        color: v-bind('elIconStyle.color');

        &:hover {
            color: v-bind('elIconStyle.hoverColor');
        }
    }
}
</style>
  