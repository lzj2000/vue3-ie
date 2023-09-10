<template>
  <a-layout class="ant-layout" id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @click="jumpToPage">
        <a-menu-item key="/home">
          <user-outlined />
          <span>首页</span>
        </a-menu-item>
        <a-menu-item key="/communication">
          <video-camera-outlined />
          <span>聊天</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" class="layout-out">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        <a-button type="link" @click="logOutOfLogin">退出登录</a-button>
      </a-layout-header>
      <a-layout-content :style="{ margin: '12px 8px', background: '#fff', minHeight: '280px' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import {
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import { useTIMStore } from '@/store/chat';
import { ITMEvents } from '@/store/plugin/TIM-plugin/type';
const selectedKeys = ref<string[]>(['/home']);
const collapsed = ref<boolean>(false);

const router = useRouter();
const timstore = useTIMStore();

let logOutOfLogin = () => {
  router.push('/login')
  localStorage.clear()
  timstore.timCore.logOutOfLogin()
};
let jumpToPage = (item:any) => {
  router.push(item.key);
};
timstore.timCore.messageReceived = (event:ITMEvents) =>{
  timstore.subscribeMessage(event)
}
</script>
<style scoped>
.ant-layout {
  height: 100vh;

  .layout-out {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
