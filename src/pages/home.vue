<template>
    <div class="activity-edit">
        <!-- 按钮 -->
        <div class="button-box">
            <div class="operate-btn">
                <a-button class="custom-button" @click="exportComponents">导出</a-button>
            </div>
        </div>

        <div class="activity-assemble">
            <div class="components">
                <ComponentList />
            </div>
            <div class="mobile">
                <ComponentPreview />
                <SideControllBar />
            </div>
            <div class="attribute">
                <ComponentSetting />
            </div>
            <div class="toolsBar">
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import ComponentList from './activityEdit/ComponentList.vue';
import ComponentPreview from './activityEdit/ComponentPreview.vue';
import ComponentSetting from './activityEdit/ComponentSetting.vue';
import SideControllBar from "@/components/SideControllBar.vue";
import { Assembly } from "@/store/component";
const assembly = Assembly()
const exportComponents = () =>{
    console.log(assembly.page);
}
</script>

<style lang="scss" scoped>
.activity-edit {
    height: calc(100% - 50px);
    overflow: hidden;

    .button-box {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        padding-top: 5px;
        height: 46px;
        border-bottom: 1px solid rgb(242, 236, 236);

        .operate-btn {
            float: right;
            display: flex;

            .custom-button {
                margin-right: 12px;
            }
        }
    }

    .activity-assemble {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: calc(100% - 50px);

        .components {
            width: 300px;
            height: 100%;
            // box-shadow: 7px 0px 7px 0px rgb(0 21 41 / 8%);
            border-right: 1px solid #eee;
        }

        .mobile {
            position: relative;
            width: 276px;
            height: 560px;
            background-image: url('@/assets/image/model.png');
            background-repeat: no-repeat;
            background-size: 276px 560px;
            box-sizing: border-box;
            padding: 69px 18px 66px;
        }

        .attribute {
            width: 400px;
            height: 100%;
            border-left: 1px solid #eee;
        }

        .toolsBar {
            position: absolute;
            top: 100px;
            right: 400px;
        }
    }
}</style>