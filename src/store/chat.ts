import { defineStore } from "pinia";
import { ITMEvent, ITMEvents } from "./plugin/TIM-plugin/type";
import { Conversation, Profile } from 'tim-js-sdk';

export const useTIMStore = defineStore('chat',{
    state() {
        return {
            conversationList:[] as Partial<Conversation>[],
            selectedKeys:[] as string[],
            chatLog:[] as ITMEvent[]
        }
    },
    TIMOptions(){
        return {
            SDKAppID:1400824081
        }
    },

    actions: {
        //接收到消息
        subscribeMessage (event:ITMEvents) {
            console.log(event,'action');
        },
        async getSessionList() {
            //获取对话列表
            const data = await this.timCore.tim?.getConversationList();
            this.conversationList = data.data.conversationList;
            //判断对话列表为空，并且非管理员
            if(this.conversationList.length == 0 && this.timCore.userID !== "admin"){
                this.conversationList.push({
                    lastMessage:{},
                    userProfile:{
                        userID:"admin",
                    } as Profile
                })
            };
            const userID = this.conversationList[0]?.userProfile?.userID;
            if(userID) {
                this.selectedKeys = [userID]
                this.getChatLog(userID)
            }
        },
        //获取消息
        async getChatLog(userID:string){
            const data = await this.timCore.tim?.getMessageList({
                conversationID:`C2C${userID}`
            })
            this.chatLog = data.data.messageList
            
        }
    }
})