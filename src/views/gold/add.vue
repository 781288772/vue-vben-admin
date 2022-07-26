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
    <a-form-item :name="['gold', 'weight']" label="重量" :rules="[{ required: true }]">
      <a-input v-model:value="formState.gold.weight" />
    </a-form-item>
    <a-form-item :name="['gold', 'type']" label="类型" :rules="[{ required: true }]">
  
          <a-select
      ref="select"
      v-model:value="formState.gold.type"
      style="width: 120px"
    >
      <a-select-option value="戒指">戒指</a-select-option>
      <a-select-option value="手链">手链</a-select-option>
      <a-select-option value="耳环" >耳环</a-select-option>
       <a-select-option value="手镯" >手镯</a-select-option>
      <a-select-option value="其它">其它</a-select-option>
    </a-select>
   
    </a-form-item>
    <a-form-item :name="['gold', 'unitPrice']" label="单价" :rules="[{ required: true }]">
      <a-input v-model:value="formState.gold.unitPrice" />
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
     @finishFailed="onFinishFailed"
   
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
    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 2 }">
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
</div>

</template>
<script lang="ts" setup>
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { ref } from 'vue';
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
import {  reactive,defineExpose,defineEmits,defineProps,onMounted,toRef} from 'vue';
const form = ref(null);
const emit = defineEmits(['finish']);
const props = defineProps<{
  type,
  goldInfo,
}>()


    const formState = reactive({
      gold: {
        id:'',
        name: '',
        weight:0,
        type:'',
        unitPrice:0,
        img:'',
        description:'',
      },
    });
    if(props.type=='edit'){
    console.log(props.goldInfo)
     formState.gold = {
        id:'',
        name: '',
        weight:0,
        type:'',
        unitPrice:0,
        img:'',
        description:'',
      };
    formState.gold = toRef(props,'goldInfo'); 
    console.log(' formState.gold', formState.gold) 
  
  }

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


    const onFinish = (values: any) => {
      // console.log('Success:', values);
      if(values.gold){
        // console.log('可请求')
        emit("finish",values.gold);
        
      }
    };
     const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
    const onSubmit = (values: any) => {
      console.log('Success:', values);
    };
  
    defineExpose({
      onSubmit,
      onFinish
    })

 
</script>

