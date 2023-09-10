<template>
    <div class="chat-box">
        <a-card class="chat-card">
            <a-menu v-model:selectedKeys="timstore.selectedKeys" class="chat-menu" mode="vertical" @click="switchUsers">
                <a-menu-item v-for="item in timstore.conversationList" :key="item.userProfile?.userID">{{
                    item.userProfile?.userID }}</a-menu-item>
            </a-menu>
            <chatLog :changingUsers="changingUsers"></chatLog>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useTIMStore } from '@/store/chat';
import { onMounted, ref } from 'vue';
import chatLog from './chatLog.vue'

const timstore = useTIMStore();
const changingUsers = ref("");
onMounted(async () => {
    try {
        await timstore.getSessionList()
    } catch (error) {

    }
})
const switchUsers = (key:{key:string}) =>{
    //清空聊天记录
    //获取历史聊天记录
    timstore.getChatLog(key.key)
    changingUsers.value = key.key
}
</script>

<style scoped lang="scss">
.chat-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    :deep(.ant-card-body) {
        height: 100%;
        display: flex;
    }

    .chat-card {
        height: 100%;
        width: 100%;

        .chat-menu {
            height: 100%;
            width: 257px;
        }

    }
}
</style>