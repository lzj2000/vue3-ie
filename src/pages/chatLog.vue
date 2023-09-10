<template>
    <div class="chat-message">
        <div class="chat-news" ref="scrollContainer">
            <div v-for="item in chatLogs">
                <div class="chat" v-if="item.flow == 'in'">
                    <div class="triangle"></div>
                    <div class="fill"></div>
                    {{ item.payload.text }}
                </div>
                <div class="chat-right" v-if="item.flow == 'out'">
                    <div class="triangle_two"></div>
                    <div class="fill_two"></div>
                    {{ item.payload.text }}
                </div>
            </div>
        </div>
        <a-textarea class="textarea" v-model:value="chatText" @keydown.enter.prevent="sendMsg" placeholder="按回车发送" :rows="4" />
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useTIMStore } from '@/store/chat';
import { ITMEvent } from '@/store/plugin/TIM-plugin/type';
const props = defineProps({
    //子组件接收父组件传递过来的值
    changingUsers: String,
})
const timstore = useTIMStore();
const chatText = ref("");

const scrollContainer = ref<HTMLElement | null>(null);
onMounted(() => {
    // 在组件挂载后执行滚动到底部
    scrollToBottom();
});
const scrollToBottom = () => {
    const el = scrollContainer.value;
    if (el) {
        el.scrollTop = el.scrollHeight;
    }
};
watch(props, () => {
    sendMessage.value = [];
    chatText.value = "";
    scrollToBottom();
});


//回车发送消息
let sendMsg = () => {
    //发送消息
    timstore.timCore.sendMessage(timstore.selectedKeys[0], { text: chatText.value })
    //聊天列表添加发送消息
    sendMessage.value.push({
        payload: {
            text: chatText.value
        },
        flow: "out"
    })
    chatText.value = ""
}
//sdk准备好调用，获取聊天记录
timstore.timCore.onReady = () => {
    timstore.getSessionList()
}
//发送与接受的消息
const sendMessage = ref<ITMEvent[]>([])
//聊天列表
const chatLogs = computed<ITMEvent[]>(() => {
    return [...timstore.chatLog, ...sendMessage.value]
})
//监听pinia中的actions，调用接受消息便往
timstore.$onAction(({ name, args }) => {
    if (name == "subscribeMessage") {
        sendMessage.value.push(...args[0].data)
    }
})

watch(sendMessage, () => {
    scrollToBottom();
});
</script>

<style scoped lang="scss">
.chat-message {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;

    .chat-news {
        flex: 1;
        height: 80%;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
    }
}
.chat {
    position: relative;
    max-width: 260px;
    padding: 10px 6px;
    border: 2px solid #ccc;
    margin-top: 20px;
    margin-left: 50px;
    margin-bottom: 10px;
    border-radius: 5px;
    word-break: break-all;
    background-color: skyblue;
    color: #fff;
}

.chat-right {
    position: relative;
    max-width: 260px;
    padding: 10px 6px;
    border: 2px solid #ccc;
    margin-top: 20px;
    margin-left: 65%;
    margin-bottom: 10px;
    border-radius: 5px;
    word-break: break-all;
    background-color: skyblue;
    color: #fff;
}

.triangle,
.triangle_two {
    position: absolute;
    top: 15px;
    border-width: 10px;
    border-style: solid;
}

.triangle {
    left: -20px;
    border-color: transparent skyblue transparent transparent;
}

.triangle_two {
    right: -20px;
    border-color: transparent transparent transparent skyblue;
}

.fill,
.fill_two {
    position: absolute;
    top: 15px;
    border-width: 10px;
    border-style: solid;
}

.fill {
    left: -16px;
    border-color: transparent skyblue transparent transparent;
}

.fill_two {
    right: -16px;
    border-color: transparent transparent transparent skyblue;
}

.textarea {
    height: 20%;
}
</style>