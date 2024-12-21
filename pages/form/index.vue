<!--
 * @Date: 2024-12-21 12:48:01
 * @LastEditTime: 2024-12-21 17:47:31
 * @Description: 请填写简介
-->
<!-- form -->
<template>
  <div class="container" >
    <lc-form :model="formModel" :rules="rules" @submit="handSubmit" ref="formRef">
      <lc-form-item name="input" label="input" required v-slot="{  }">
        <input  v-model="formModel.input" placeholder="自动获得焦点"/>
      </lc-form-item>
      <lc-form-item name="checkbox" label="checkbox" required v-slot="{ validate }">
         <van-checkbox :value="formModel.checkbox" @change="(event)=>{
          formModel.checkbox = event.detail
          validate();
         }">复选框</van-checkbox>
      </lc-form-item>
      <!-- 直接监听change的变化 这里无法进行校验-->
      <lc-form-item name="picker" label="picker" required>
        <template #default="{ validate }">
          <button @click="()=>isShowPicker = true">{{ formModel.picker || "请选择"}}></button>
        </template>
      </lc-form-item>
      <lc-form-item name="radio" label="radio" required v-slot="{ validate }">
        <van-radio-group
          :value="formModel.radio"
          @change="(event)=>{
            formModel.radio = event.detail
            validate();
          }"
          direction="horizontal"
        >
          <van-radio :name="1">单选框 1</van-radio>
          <van-radio :name="2">单选框 2</van-radio>
        </van-radio-group>
      </lc-form-item>
      <lc-form-item name="uploader" label="uploader" required v-slot="{ validate }">
        <van-uploader :file-list="formModel.uploader" @afterRead="()=>{
          formModel.uploader = [
            {
              url: 'https://img.yzcdn.cn/vant/leaf.jpg',
              name: '图片1',
            },
            {
              url: 'http://iph.href.lu/60x60?text=default',
              name: '图片2',
              isImage: true,
              deletable: true,
            }
          ]
          validate();
        }" />
      </lc-form-item>
      <lc-form-item name="calendar" label="calendar" required v-slot="{ validate }">
        <button @click="()=>isShowCalendar = true">{{ formModel.calendar || "请选择日期"}}></button>
        <!-- <van-cell title="选择单个日期" :value="formModel.calendar" @click="()=>isShowCalendar = true" /> -->
      </lc-form-item>
      <button @click="handSubmit">提交</button>
    </lc-form>
    <!-- picker -->
    <van-picker v-if="isShowPicker" :columns="['杭州', '宁波', '温州', '嘉兴', '湖州']" confirm-button-text="确认" cancel-button-text="取消" @change="(event)=>{
      const { picker, value, index } = event.detail;
      formModel.picker = value;
      isShowPicker = false;
      formRef.validate('','picker');
    }" />
    <!-- 日历 -->
    <van-calendar :show="isShowCalendar" @close="()=>{
      isShowCalendar = false;
      formRef.validate('','calendar');
    }" @confirm="(event)=>{
      isShowCalendar = false
      formModel.calendar =  formatDate(event.detail);
      formRef.validate('','calendar');
    }" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface RegisterModel {
  input: string;
  checkbox: boolean;
  picker: string;
  radio:string;
  uploader: {url:string,name:string,isImage?:boolean,deletable?:boolean}[];
  calendar:string;
}

const formModel = ref<RegisterModel>({})
const formRef = ref();
const isShowPicker = ref(false);
const isShowCalendar = ref(false);

const rules = ref({
  input: [
    { min:3, message: 'must be at least 3 characters', trigger:'input'},
    { required: true, message: 'input is required'},
  ],
  checkbox: [
    { type: 'boolean', required: true, message: 'checkbox is required'},
  ],
  radio: [
    { type: 'number', required: true, message: 'radio is required'},
  ],
  picker:[
    { required: true, message: 'must be at least 3 characters' ,trigger:'change'},
  ],
  calendar:[
    { required: true, message: 'calendar is required', trigger:'change'},
  ]
});

const formatDate = (date) => {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }

const handSubmit = async ()=>{
  const isValid = await formRef.value.submit();
  if (isValid) {
    console.log('Form submitted:', formModel.value);
  }
}

</script>

<style lang="scss" scoped>

</style>