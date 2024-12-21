<!--
 * @Date: 2024-12-21 12:45:24
 * @LastEditTime: 2024-12-21 16:33:23
 * @Description: 请填写简介
-->
<!-- form -->
<template>
    <form class="lc-form" @submit="onSubmit">
      <slot></slot>
    </form>
</template>

<script setup lang="ts">
import { toRefs,reactive,provide, toRaw } from 'vue';
import AsyncValidator from 'async-validator';

interface FromPropsType {
  model: Object,
  rules: Record<string, any>
}

const emits = defineEmits(['submit','failed']);
const props = defineProps<FromPropsType>()
const { model, rules } = toRefs(props);
const formState = reactive({
  model: model.value,
  errors: {} as Record<string, string[]>,
  isSubmitting: false,
});

// 用来验证表单
const validate = async (key?:string) => {
  let description = {};
  let validateData = {};
  if(key){
    description[key] = rules.value[key];
    validateData[key] = model.value?.[key];
  }else{
    description =  toRaw(rules.value);
    validateData = toRaw(model.value);
  }
  const validator = new AsyncValidator(description);
  try {
    await validator.validate(validateData);
    formState.errors = {}; // 清空错误信息
    console.log('===>验证正常')
    return true;
  } catch ({ errors, fields }) {
    console.log('Validation failed:', errors);
    console.log('Field-specific errors:', fields);
    formState.errors = fields
    return false;
  }
};

const onSubmit = (e: Event )=>{
  e.preventDefault()
  emits('submit')
}

// 提交表单
const submit = async () => {
  formState.isSubmitting = true;
  const isValid = await validate();
  formState.isSubmitting = false;
  return isValid;
};

provide('form', {
  formState,
  submit,
  validate,
});

defineExpose({
  submit,
  validate,
  formState
})

</script>

<style lang="scss" scoped>

</style>