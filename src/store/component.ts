import { getActivityTemplateData } from "@/common/helpers";
import { defineStore } from "pinia";
import { componentTemplateData } from "@/common/type"
import { getCurrentComponet, collectHistoryData } from '@/common/helpers'

export const Assembly = defineStore('assembly', {
    state() {
        return {
            page: getActivityTemplateData(),
            currentComponent: {
                name: '',
                fullName: '',
                mark: '',
            },
            historyData: [] as any[],
        }
    },
    getters: {
    },
    actions: {
        //添加组件
        addComponent(componentsData: componentTemplateData) {
            this.$state.page.components.push(componentsData)

            collectHistoryData(Assembly(), {
                type: 'add',
                name: '添加组件-' + componentsData.fullName,
            });
        },
        updateComponet({ newDetail, key }: any) {
            // key  1.page 更新活动detail 2.detail 更新组件detail 3.style 更新组件style
            if (key === 'page') {
                this.$state.page.detail = { ...this.$state.page.detail, ...newDetail };
                return;
            }
            // 获取当前选中组件
            let currentComp = getCurrentComponet(Assembly());
            // 区分更新组件 detail 还是 style
            if (currentComp !== undefined) {
                // 在这里可以安全地使用 obj
                key === 'style'
                    ? (currentComp.style = { ...currentComp.style, ...newDetail })
                    : (currentComp.detail = { ...currentComp.detail, ...newDetail });

                collectHistoryData(Assembly(), {
                    type: 'style',
                    name: '修改样式-' + currentComp?.fullName,
                });
            }
        },
        changeCurrentComponent(newComp: { name: string; fullName: string; mark: string; }) {
            // 切换选中组件
            this.$state.currentComponent = newComp;
        },
        addHistoryData(historyData: any) {
            // 添加历史记录数据
            this.$state.historyData.unshift(historyData);
        },
        swapComponent({ orange: i1, target: i2, containerComponents }:any) {
            // 提供组件下标，交换位置
            const components = containerComponents || this.$state.page.components;
            [components[i1], components[i2]] = [components[i2], components[i1]];

            collectHistoryData(this, {
                type: 'swap',
                name: '移动组件-' + components[i2].fullName,
            });
        },
        insertComponent({ i, componentData, containerComponents }:any) {
            // 数组任意位置插入组件
            const components = containerComponents || this.$state.page.components;
            components.splice(i, 0, componentData);
      
            collectHistoryData(this, {
              type: 'copy',
              name: '复制组件-' + componentData.fullName,
            });
        },
        deleteComponent({ i, containerComponents }:any) {
            // 提供下标，删除组件
            const components = containerComponents || this.$state.page.components;
            const delComp = components.splice(i, 1);
      
            collectHistoryData(this, {
              type: 'delete',
              name: '删除组件-' + delComp[0]?.fullName,
            });
          },
    }
})