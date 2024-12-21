<!--
 * @Date: 2024-12-21 12:45:24
 * @LastEditTime: 2024-12-21 17:47:12
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

type RuleItemType = Record<string, any>

interface FromPropsType {
  model: Object,
  rules: RuleItemType[]
}

const emits = defineEmits(['submit','failed']);
const props = defineProps<FromPropsType>()
const { model, rules } = toRefs(props);
const formState = reactive({
  errors: {} as Record<string, string[]>,
  isSubmitting: false,
});

const getFilteredRule = (rules: RuleItemType = [], trigger?: string)=>{
  return rules?.filter(rule => {
    if (!rule.trigger || trigger === '') return true;
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.indexOf(trigger) > -1;
    } else {
      return rule.trigger === trigger;
    }
  });
}

// 用来验证表单
const validate = async (trigger?: string, key?:string) => {
  let description = {};
  
  // rules
  if(key){
    if(!rules.value[key]?.length) return ;
    const _rules = getFilteredRule(rules.value[key], trigger);
    description[key] = _rules;
  }else{
    description =  rules.value;
  }
  let validateData = {};
  if(key){
    validateData[key] = model.value?.[key];
  }else{
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
  model,
  rules,
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