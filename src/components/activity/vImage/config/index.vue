<template>
    <a-form :model="form">
        <a-form-item label="图片资源：">
            <a-radio-group v-model:value="type">
                <a-radio value="upload">上传</a-radio>
                <a-radio value="link">链接</a-radio>
            </a-radio-group>
            <a-input v-if="type === 'link'" v-model:value="form.src" placeholder="请输入图片链接" style="width: 220px" />
            <div v-else style="width: 100%">
                <a-upload v-model:file-list="fileList" 
                name="avatar" 
                list-type="picture-card" 
                class="avatar-uploader"
                :show-upload-list="false" 
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :before-upload="beforeAvatarUpload" 
                @change="handleChange">
                    <img v-if="imageUrl" class="imgshow" :src="imageUrl" alt="avatar" />
                    <div v-else>
                        <loading-outlined v-if="loading"></loading-outlined>
                        <plus-outlined v-else></plus-outlined>
                        <div class="ant-upload-text">Upload</div>
                    </div>
                </a-upload>
            </div>
        </a-form-item>
        <a-form-item label="点击事件：">
            <ClickEventInput />
        </a-form-item>
    </a-form>
    <BaseSetting></BaseSetting>
</template>
  
<script setup>
import { reactive, ref, watch } from 'vue';
import BaseSetting from '@/components/disposition/baseSetting/index.vue';
import ClickEventInput from '@/components/disposition/clickEventInput/index.vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';

const props = defineProps({
    updateComponentProps: { type: Function },
    src: { type: String, default: '' },
});

const form = reactive({
    src: props.src,
});

watch(form, () => {
    props.updateComponentProps(form);
});

// 图片资源
const type = ref('upload');
const action = "";
// 图片格式检验
const beforeAvatarUpload = (rawFile) => {
    const typeList = ['image/jpeg', 'image/png'];
    if (!typeList.includes(rawFile.type)) {
        ElMessage.error('文件格式不正确，仅支持jpeg和png格式！');
        return false;
    }
    return true;
};
// 图片上传成功
const handleAvatarSuccess = (response) => {
    const { code, message, imgUrl } = response;
    if (code === 0) {
        ElMessage.success('图片上传成功！');
        form.src = imgUrl;
    } else {
        ElMessage.error(message || '上传失败！');
    }
};

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const fileList = ref([]);
const loading = ref(false);
const imageUrl = ref('');

const handleChange = (info) => {
    if (info.file.status === 'uploading') {
        loading.value = true;
        return;
    }
    if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (base64Url) => {
            imageUrl.value = base64Url;
            form.src = base64Url;
            loading.value = false;
        });
    }
    if (info.file.status === 'error') {
        loading.value = false;
        message.error('upload error');
    }
};
</script>
  
<style lang="scss" scoped>
.avatar-uploader :deep(.el-upload) {
    border: 1px dashed #b4b6b8;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: 0.2s;
}

.avatar-uploader :deep(.el-upload):hover {
    border-color: #0c82f8;
}

.a-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 180px;
    height: 180px;
    text-align: center;
}

.avatar-uploader>.ant-upload {
    width: 128px;
    height: 128px;
}

.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
.imgshow{
    width: 100.4px;
    height: 100.4px;
}
</style>
  