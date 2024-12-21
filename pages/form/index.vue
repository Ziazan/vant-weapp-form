<!--
 * @Date: 2024-12-21 12:48:01
 * @LastEditTime: 2024-12-21 14:44:33
 * @Description: 请填写简介
-->
<!-- form -->
<template>
  <div class="container" >
    <lc-form v-model="formModel" :rules="rules" @submit="handSubmit" ref="formRef">
      <!-- 名称 -->
      <lc-form-item name="username" label="名称" required v-slot="{ validate }">
        <input  v-model="formModel.username" placeholder="自动获得焦点" @blur="validate" />
      </lc-form-item>
       <!-- 名称 -->
       <lc-form-item name="age" label="年龄" required v-slot="{ validate }">
        <input v-model="formModel.age" type="number" placeholder="自动获得焦点" @blur="(event)=>{
          formModel.age = +event.target.value;
          validate();
        }" />
      </lc-form-item>
      <button @click="handSubmit"> 提交 </button>
    </lc-form>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface RegisterModel {
  username: string;
  password: string;
  age?: number;
  className: string;
}

const formModel = ref<RegisterModel>({
  username:'',
  password:'',
  className: '',
  age: undefined,
})
const formRef = ref();

const rules = ref({
  username: [
    { required: true, message: 'Username is required', trigger: 'blur' },
    { min: 3, message: 'Username must be at least 3 characters' },
  ],
  age: [
    { type: 'number', required: true, message: 'Age is required' },
    { type: 'number', min: 18, message: 'Age must be at least 18' },
  ],
});

const handSubmit = async ()=>{
  const isValid = await formRef.value.submit();
  if (isValid) {
    console.log('Form submitted:', formModel.value);
  }
}

</script>

<style lang="scss" scoped>

</style>