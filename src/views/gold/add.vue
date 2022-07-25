<template>
<div style="padding: 20px">
    <a-form
    :model="formState"
    v-bind="layout"
    name="nest-messages"
    :validate-messages="validateMessages"
    @finish="onFinish"
    @submit ="onSubmit"
    ref="form"
  >
    <a-form-item :name="['gold', 'name']" label="名称" :rules="[{ required: true }]">
      <a-input v-model:value="formState.gold.name" />
    </a-form-item>
    <a-form-item :name="['gold', 'weight']" label="重量" :rules="[{ type: 'email' }]">
      <a-input v-model:value="formState.gold.weight" />
    </a-form-item>
    <a-form-item :name="['gold', 'type']" label="类型" :rules="[{ type: 'number', min: 0, max: 99 }]">
      <a-input-number v-model:value="formState.gold.type" />
    </a-form-item>
    <a-form-item :name="['gold', 'unit_price']" label="单价">
      <a-input v-model:value="formState.gold.unit_price" />
    </a-form-item>
    <a-form-item :name="['gold', 'img']" label="图片">
       <a-upload
    v-model:file-list="fileList"
    name="file"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    action="/api/upload/doAdd"
    :before-upload="beforeUpload"
    @change="handleChange"
    @validate=""
   
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <loading-outlined v-if="loading"></loading-outlined>
      <plus-outlined v-else></plus-outlined>
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
    </a-form-item>
     <a-form-item :name="['gold', 'description']" label="描述">
      <a-textarea v-model:value="formState.gold.description" />
    </a-form-item>
    <!-- <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form-item> -->
  </a-form>
</div>

</template>
<script lang="ts" setup>
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { ref } from 'vue';
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
import {  reactive,defineExpose } from 'vue';
// function getBase64(img: Blob, callback: (base64Url: string) => void) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// }
const form = ref(null);

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };
    const fileList = ref([]);
    const loading = ref<boolean>(false);
    const imageUrl = ref<string>('');

    const handleChange = (info: UploadChangeParam) => {
      if (info.file.status === 'uploading') {
        loading.value = true;
        return;
      }
      if (info.file.status === 'done') {
          loading.value = false;
        // Get this url from response in real world.

        console.log('info',info)
        formState.gold.img = info.file.response.url;
      }
      if (info.file.status === 'error') {
        loading.value = false;
        message.error('upload error');
      }
    };
    
    const beforeUpload = (file: UploadProps['fileList'][number]) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    };
    const formState = reactive({
      gold: {
        name: '',
        weight:'',
        type:'',
        unit_price:'',
        img:'',
        description:'',
      },
    });
    const onFinish = (values: any) => {
      console.log('Success:', values);
    };
    const onSubmit = (values: any) => {
      console.log('Success:', values);
    };
    const onValidate = () =>{
     form.value.validate(valid=>{
      console.log(valid)
      if(valid){
       return Promise.resolve(valid);
      }else{
        return Promise.reject(valid);
      }
    
     
     })

    }
    defineExpose({
      onSubmit,
      onFinish,
      onValidate
    })

 
</script>

