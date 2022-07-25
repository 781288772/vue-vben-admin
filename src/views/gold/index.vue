<template>
  <div class="btn_content">
     <a-button @click="addBtnClick">添加</a-button>
  </div>
  <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
    <!-- <template #footer>
      <div>
        <b>ant design vue</b>
        footer part
      </div>
    </template> -->
    <template #renderItem="{ item }">
      <a-list-item key="item.name">
        <template #actions>
          <span v-for="{ type, text } in actions" :key="type" class="hover">
            <component :is="type" style="margin-right: 8px" @click="operations(type,item)" />
            {{ text }}
          </span>
        </template>
        <template #extra>
          <img
            width="272"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        </template>
        <a-list-item-meta :description="item.description">
          <template #title>
            {{ item.name }}
          </template>
          <template #avatar><a-avatar :src="item.avatar" /></template>
        </a-list-item-meta>
        {{'¥'+ item.price }}
      </a-list-item>
    </template>
  </a-list>
   <a-modal v-model:visible="state.detailVisible" title="Gold Info" @ok="handleOk">
      <info :goldInfo="state.goldInfo" v-if="state.dialogType=='info'"></info>
      <add  v-if="state.dialogType=='add'" ref="addForm" ></add>
    </a-modal>
 
</template>

<script lang="ts" setup>
import { defHttp } from '/@/utils/http/axios';
import { message } from 'ant-design-vue';
import {reactive,onMounted,ref} from "vue";
import info from "./info.vue";
import add from "./add.vue";

let listData: Record<string, string>[] = reactive([]);
const addForm = ref(null)

const state = reactive({
  current:1,
  id:'',
  goldInfo:{},
  detailVisible:false,
  dialogType:'',
})
onMounted(async()=>{
  
  try{
    const list = await getList();
    listData.push(...list.list);
  }catch(e){
    console.log(e)
  };
});

const addBtnClick = ()=>{
  state.dialogType='add';
  state.detailVisible = true;
}

const handleOk = ()=>{
  console.log(addForm.value)
  // addForm?.value?.onSubmit();
  addForm?.value?.onValidate();
  // state.detailVisible = false;
}

 const getList = async ()=>{
       return await defHttp.get({url: '/gold/list',params: {current:state.current, size: 10,}},{errorMessageMode: 'modal'})
 }
 const  getDetails = async(id:number)=>{
    return await defHttp.get({url: '/gold/detail',params: {id}},{errorMessageMode: 'modal'})
  }
   const operations = (type,e)=>{
   switch(type){
    case'EyeOutlined':
      message.success('查看');
      state.detailVisible = true;
      state.dialogType = 'info';
       getDetails(e.id).then(res=>{
        console.log(res)
        state.goldInfo = res;
       });
      break;
    case'EditOutlined':
      message.success('编辑');
      break;
    case'DeleteOutlined':
      message.success('删除');
      break;
  }

 }




// for (let i = 0; i < 23; i++) {
//   listData.push({
//     href: 'https://www.antdv.com/',
//     title: `ant design vue part ${i}`,
//     avatar: 'https://joeschmoe.io/api/v1/random',
//     description:
//       'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//     content:
//       'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//   });
// }
   const pagination = {
      onChange: (page: number) => {
        console.log(page);
        state.current = page;
      },
      pageSize: 10,
    };
    const actions: Record<string, string>[] = [
      { type: 'EyeOutlined', text: '' },
      { type: 'EditOutlined', text: '' },
      { type: 'DeleteOutlined', text: '' },
    ];


</script>
<script lang="ts">
import { EyeOutlined,DeleteOutlined,StarOutlined, EditOutlined,LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    EyeOutlined,
    DeleteOutlined,
    EditOutlined,
    StarOutlined,
    LikeOutlined,
    MessageOutlined,
  },
  })
</script>
<style lang="less">
.btn_content{
  padding: 20px;
}

.hover{
  cursor: pointer;
}
</style>
