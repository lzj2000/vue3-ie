// 判断是否容器组件
export const isContainerComponent = (componentName: string) => {
    // carrier
    const containerList = ['carrier'];
    if (containerList.includes(componentName)) return true;
    return false;
  };
  