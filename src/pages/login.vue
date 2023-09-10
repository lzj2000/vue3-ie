<template>
    <div id="app">
        <vue-particles id="tsparticles" :particlesInit="particlesInit" :options="{
            background: {
                color: {
                    value: '#84AF9B'
                }
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: 'push'
                    },
                    onHover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    resize: true
                },
                modes: {
                    bubble: {
                        distance: 400,
                        duration: 2,
                        opacity: 0.8,
                        size: 40
                    },
                    push: {
                        quantity: 4
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    }
                }
            },
            particles: {
                color: {
                    value: '#ffffff'
                },
                links: {
                    color: '#ffffff',
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 1
                },
                collisions: {
                    enable: true
                },
                move: {
                    direction: 'none',
                    enable: true,
                    outModes: {
                        default: 'bounce'
                    },
                    random: false,
                    speed: 6,
                    straight: false
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value: 80
                },
                opacity: {
                    value: 0.5
                },
                shape: {
                    type: 'circle'
                },
                size: {
                    value: { min: 1, max: 5 },
                }
            },
            detectRetina: true
        }" />
        <div class="login">
            <a-card style="width: 500px" class="loginCard">
                <h2 class="pageTitle">小李聊天室</h2>
                <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
                    autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
                    <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入你的用户名!' }]">
                        <a-input v-model:value="formState.username" />
                    </a-form-item>

                    <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入你的密码!' }]">
                        <a-input-password v-model:value="formState.password"  autocomplete="off"/>
                    </a-form-item>

                    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                    </a-form-item>

                    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                        <a-button type="primary" html-type="submit">登录</a-button>
                    </a-form-item>
                </a-form>
            </a-card>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import { genTestUserSig } from '../../debug/GenerateTestUserSig'
import { useTIMStore } from '../store/chat'
import { useRouter } from 'vue-router';

const router = useRouter();
const timstore = useTIMStore();

//particles背景
const particlesInit = async (engine: any) => {
    //await loadFull(engine);
    await loadSlim(engine);
};


//登录模块
interface FormState {
    username: string;
    password: string;
    remember: boolean;
}
const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
});
const onFinish = (values: any) => {
    console.log('Success:', values);
    const { userSig } = genTestUserSig({
        SDKAppID:1400824081,
        secretKey:"d9c88218b1b141ac3932cd2446a167169c10466b67051305ad610c4994ab54a2",
        userID:formState.username
    })
    timstore.timCore.timLogin({userSig,userID:formState.username})
    router.push('/home')
};
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
</script>

<style scoped lang="scss">
.login {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .loginCard {
        display: flex;
        justify-content: center;
        align-items: center;
        opacity:0.7; 
        .pageTitle {
            text-align: center;
            margin-bottom: 30px;
        }
    }
}
</style>
