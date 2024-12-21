<!--
 * @Date: 2024-12-21 12:48:01
 * @LastEditTime: 2024-12-21 23:48:36
 * @Description: 请填写简介
-->
<!-- form -->
<template>
  <div class="container" >
    <lc-form :model="formModel" :rules="rules" @submit="handSubmit" ref="formRef" @validate="onValidate">
      <lc-form-item name="input" label="input" required v-slot="{ validate }" :rules="fieldRules.input">
        <input  v-model="formModel.input" placeholder="自动获得焦点"/>
      </lc-form-item>
      <lc-form-item name="checkbox" label="checkbox" required v-slot="{ validate }">
         <van-checkbox :value="formModel.checkbox" @change="(event)=>{
          formModel.checkbox = event.detail
         }">复选框</van-checkbox>
      </lc-form-item>
      <!-- 直接监听change的变化 这里无法进行校验-->
      <lc-form-item name="picker" label="picker" required>
        <template #default="{  }">
          <button @click="()=>isShowPicker = true">{{ formModel.picker || "请选择"}}></button>
        </template>
      </lc-form-item>
      <lc-form-item name="radio" label="radio" required v-slot="{ validate }">
        <van-radio-group
          :value="formModel.radio"
          @change="(event)=>{
            formModel.radio = event.detail
          }"
          direction="horizontal"
        >
          <van-radio :name="1">单选框 1</van-radio>
          <van-radio :name="2">单选框 2</van-radio>
        </van-radio-group>
      </lc-form-item>
      <lc-form-item name="uploader" label="uploader" v-slot="{ validate }">
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
      </lc-form-item>
      <button @click="handSubmit">提交</button>
    </lc-form>
    <!-- picker -->
    <van-picker v-if="isShowPicker" :columns="['杭州', '宁波', '温州', '嘉兴', '湖州']" confirm-button-text="确认" cancel-button-text="取消" @change="(event)=>{
      const { picker, value, index } = event.detail;
      formModel.picker = value;
      isShowPicker = false;
      formRef.validateField(['picker'],(message)=>{
        console.log('%c [ message ]-64', 'font-size:13px; background:pink; color:#bf2c9f;', message)
      });
    }" />
    <!-- 日历 -->
    <van-calendar :show="isShowCalendar" @close="()=>{
      isShowCalendar = false;
      formRef.validateField(['calendar'],(message)=>{
        console.log('%c [ message ]-64', 'font-size:13px; background:pink; color:#bf2c9f;', message)
      });
    }" @confirm="(event)=>{
      isShowCalendar = false
      formModel.calendar =  formatDate(event.detail);
      formRef.validate('calendar',(message)=>{
        console.log('%c [ message ]-64', 'font-size:13px; background:pink; color:#bf2c9f;', message)
      });
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
    { min:4,  message: 'must be at least 4 characters', trigger:'input' },
    { type:'string', min:3, message: 'must be at least 3 characters', trigger:'change'},
    { required: true, message: 'input is required'},
  ],
  checkbox: [
    { type: 'boolean', required: true, message: 'checkbox is required'},
  ],
  radio: [
    { type: 'number', required: true, message: 'radio is required'},
  ],
  picker:[
    { required: true, message: 'picker is required'},
    { min:2,  message: 'must be at least 3 characters'},
  ],
  calendar:[
    { required: true, message: 'calendar is required', trigger:'change'},
  ]
});

const fieldRules = ref({
  input: [
    { type:'string', max: 5, message: 'input field max rules'},
  ],
})

const formatDate = (date) => {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }

const handSubmit = async ()=>{
  const valid = await formRef.value.validate().catch(invalidFields =>{
    console.log('%c [ invalidFields ]-128', 'font-size:13px; background:pink; color:#bf2c9f;', invalidFields)
  });
  if(valid){
    console.log('Form submitted:', formModel.value);
  }
}

const onValidate = (name, status, errorMessage)=>{
  console.log('%c [ name, status, errorMessage ]-142', 'font-size:13px; background:pink; color:#bf2c9f;', name, status, errorMessage)
}

</script>

<style lang="scss" scoped>

</style>