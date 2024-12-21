<!--
 * @Date: 2024-12-21 12:45:24
 * @LastEditTime: 2024-12-21 23:07:37
 * @Description: 请填写简介
-->
<!-- form -->
<template>
    <form class="lc-form" @submit="onSubmit">
      <slot></slot>
    </form>
</template>

<script setup lang="ts">
import { toRefs,reactive,provide, ref, computed } from 'vue';
import type { ComponentInternalInstance } from 'vue';
import objectAssign from './merge'

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
const fields = ref<ComponentInternalInstance[]>([]);

const registerField = (field: ComponentInternalInstance) => {
  if(field){
    fields.value.push(field);
  }
}

const removeField = (field) =>{
  if (field.name) {
    fields.value.splice(fields.value.indexOf(field), 1);
  }
}

const getFieldValidateFn = (field: ComponentInternalInstance)=>{
  return field.exposed?.validate
}

const getFieldProps = (field: ComponentInternalInstance)=>{
  return field.props
}

// 用来验证表单
const validate = async (callback?:any) => {
  if (!model.value) {
    console.warn('[Warn][Form]model is required for validate to work!');
    return;
  }

  let promise;
  if(typeof callback !== 'function' && Promise){
    promise = new Promise((resolve, reject)=>{
      callback = function(valid, invalidFields){
        valid? resolve(valid): reject(invalidFields)
      }
    })
  }
  let valid = true;
  let count = 0;
  if(fields.value?.length === 0 && callback){
    callback(true)
  }

  let invalidFields = {};
  fields.value.forEach(field => {
    const fieldValidateFn = getFieldValidateFn(field);
    fieldValidateFn('', (message, invalidField) =>{
      if (message) {
        valid = false;
      }
      invalidFields = objectAssign({}, invalidFields, invalidField);
      if (typeof callback === 'function' && ++count === fields.value.length) {
        callback(valid, invalidFields);
      }
    })
  })

  if (promise) {
    return promise;
  }
};

const validateField = (props, cb) => {
  props = [].concat(props);
  const _fields = fields.value.filter(field => {
    const fieldProps = getFieldProps(field);
    return props.indexOf(fieldProps.name) !== -1
  });
  if (!_fields.length) {
    console.warn('[Warn]please pass correct props!');
    return;
  }

  _fields.forEach(field => {
    const validateFn = getFieldValidateFn(field);
    validateFn('', cb);
  });
}

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
  model: computed(()=>model.value),
  rules,
  registerField,
  removeField,
  submit,
  validate,
});

defineExpose({
  submit,
  validate,
  validateField,
  formState
})

</script>

<style lang="scss" scoped>

</style>