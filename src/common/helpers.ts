import { isContainerComponent } from '@/utils/check';
import { componentTemplateData, TemplateData,pageData } from './type'
// 活动数据标准model
export const getActivityTemplateData = () => {
    return {
        components: [] as componentTemplateData[],
        detail: {
            name: '',
            title: '活动页',
            date: [],
        },
        mark: 'activity-' + Date.now(),
    };
};

// 组件数据标准model
export const getComponentTemplateData = ({ name, fullName }: TemplateData) => {
    return {
        name,//vButtonConfig
        fullName,//按钮
        mark: name + '-' + Date.now(),//vButton-1692324872745
        detail: {},
        style: {},//
    };
};

// 获取当前选中组件
export const getCurrentComponet = (assembly: { currentComponent: { mark: string; }; page: pageData; }) => {
    const currentMark = assembly.currentComponent.mark;
    const page = assembly.page;
    const components = page.components;
    let currenComp = components.find((c: { mark: string; }) => c.mark === currentMark);
    // 容器组件内部查找
    if (!currenComp) {
      components.forEach((comp:any) => {
        if (comp.components) {
          currenComp = comp.components.find((c: { mark: string; }) => c.mark === currentMark);
        }
      });
    }
    return currenComp;
  };

  // 添加历史记录数据
export const collectHistoryData = (assembly: { page: any; addHistoryData: (arg0: { type: any; name: any; data: any; }) => void; }, { type, name }: any) => {
  const pageData = assembly.page;
  const historyData = {
    type,
    name,
    data: JSON.parse(JSON.stringify(pageData)),
  };
  assembly.addHistoryData(historyData);
};

// 更新组件数据
export const updateComponent = (store: { updateComponet: (arg0: { newDetail: any; key: any; }) => void; }, { newDetail, key }: any) => {
  store.updateComponet({ newDetail, key });
};

// 处理传入的style对象
export const generateStyle = (style: { [x: string]: any; }) => {
  // 几何属性，需要加单位px
  const sizeList = ['width', 'height'];
  // 多余属性，需要剔除
  const reduceList = ['align'];

  const ripeStyle = {} as any;
  for (const key in style) {
    if (sizeList.includes(key)) {
      ripeStyle[key] = style[key] + 'px';
    } else if (!reduceList.includes(key)) {
      ripeStyle[key] = style[key];
    }
  }
  return ripeStyle;
};

// 打开活动配置
export const openActivityConfig = (store: { changeCurrentComponent: (arg0: { name: string; fullName: string; mark: string; }) => void; }) => {
  store.changeCurrentComponent({
    name: 'activity',
    fullName: '活动页',
    mark: 'activity-' + Date.now(),
  });
};

// 获取当前选中组件索引 （传containerCompnonents，即走的容器组件）
export const getCurrentComponetIndex = (store: { currentComponent: { mark: any; }; page: { components: any; }; }, containerCompnonents: any) => {
  const currentMark = store.currentComponent.mark;
  const components = containerCompnonents || store.page.components;
  const index = components.findIndex((c: { mark: any; }) => c.mark === currentMark);
  return index;
};

// 获取容器组件及选中的子组件
export const getContainerComponet = (store: { currentComponent: { mark: any; }; page: any; }) => {
  const currentMark = store.currentComponent.mark;
  const page = store.page;
  const components = page.components;
  let containerInfo = {};
  components.forEach((comp: { name: any; components: any[]; }) => {
    if (isContainerComponent(comp.name)) {
      const currenComp = comp.components.find((c) => c.mark === currentMark);
      containerInfo = currenComp
        ? { container: comp, subComp: currenComp }
        : {};
    }
  });
  return containerInfo;
};

// 切换选中组件
export const selectComponent = (store: { changeCurrentComponent: (arg0: { name: any; fullName: any; mark: any; }) => void; }, component: { name: any; fullName: any; mark: any; }) => {
  store.changeCurrentComponent({
    name: component.name,
    fullName: component.fullName,
    mark: component.mark,
  });
};
