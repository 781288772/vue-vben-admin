<template>
<div class="info">
  <a-descriptions title="">
    <a-descriptions-item label="Name">{{props.goldInfo.name}}</a-descriptions-item>
    <a-descriptions-item label="Price">{{props.goldInfo.price}}</a-descriptions-item>
    <a-descriptions-item label="Unit Price">{{props.goldInfo.unit_price}}</a-descriptions-item>
    <a-descriptions-item label="Weight">{{props.goldInfo.weight}}</a-descriptions-item>
     <a-descriptions-item label="Create Time">{{new Date(props.goldInfo.create_time).toLocaleDateString()}}</a-descriptions-item>
      <a-descriptions-item label="type">{{props.goldInfo.type}}</a-descriptions-item>
    <a-descriptions-item label="Description">
      {{props.goldInfo.description}}
    </a-descriptions-item>
  </a-descriptions>
</div>
  
</template>
<script setup>
import {defineProps,onMounted} from "vue";
const props = defineProps({
  goldInfo: {
    type: Object,
    default: {},
  },
});
onMounted(()=>{
  console.log(props)
});
</script>

<style lang="less">
.info{
  padding: 20px;
}
</style>


