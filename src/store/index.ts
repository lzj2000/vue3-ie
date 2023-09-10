import { createPinia } from 'pinia';
import IM from './plugin/TIM-plugin'

const store = createPinia();

store.use(IM)

export default store;