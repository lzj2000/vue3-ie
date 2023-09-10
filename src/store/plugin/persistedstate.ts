import { PiniaPluginContext } from "pinia";

export function persistedstate(context: PiniaPluginContext) {
    const currentState = JSON.parse(localStorage.getItem(context.store.$id) || "{}")
    context.store.$patch(currentState)
    //第一个时当前修改store的上下文，第二个是当前修改的状态
    context.store.$subscribe((_store,state) =>{
        localStorage.setItem(_store.storeId,JSON.stringify(state))
    },{
        //组件卸载依赖还在
        detached:true
    })
}