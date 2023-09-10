import 'pinia'
import TIMcore from './store/plugin/TIM-plugin/TIM-core'
import ITMProps from './store/plugin/TIM-plugin/type'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    
    TIMOptions?:() => ITMProps
  }
  export interface PiniaCustomProperties {
    timCore:TIMcore
  }
}