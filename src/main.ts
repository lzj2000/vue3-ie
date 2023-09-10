import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from "./router/index";
import store from './store';
declare module "particles.vue3";
import Particles from 'particles.vue3'
import Antd from 'ant-design-vue';
import registerCustomComponents from './components/activity/index';
import ActivityTopBarConfig from '@/pages/activityEdit/activityConfig/activityConfig.vue';

const app = createApp(App);

registerCustomComponents(app);//注册组件
app.component('ActivityConfig', ActivityTopBarConfig);//注册活动配置
app.use(router); //注册路由
app.use(store);//注册仓库
app.use(Particles);//注册背景
app.use(Antd);
app.mount('#app');
