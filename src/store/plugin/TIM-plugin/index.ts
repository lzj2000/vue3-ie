import { PiniaPluginContext } from "pinia";
import TIMcore from "./TIM-core";

export default (context:PiniaPluginContext) =>{
    if(context.options.TIMOptions){
        const timCore = new TIMcore(context.options.TIMOptions());
        context.store.timCore = timCore
    }
}