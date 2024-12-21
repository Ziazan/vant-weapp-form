<!--
 * @Date: 2024-12-21 12:46:34
 * @LastEditTime: 2024-12-22 01:11:55
 * @Description: 请填写简介
-->
<!-- form-item -->
<template>
  <van-field
    :name="name"
    :label="label"
    :error-message="validateMessage"
    :rules="rules"
    :required="required"
    autosize
    :size="size"
  >
  <template #input>
    <view >
      <slot :validate="validate"></slot>
    </view>
  </template>
  </van-field>
</template>

<script setup lang="ts">
import { ref, inject, toRefs, computed, toRaw, watch, onMounted, onUnmounted, getCurrentInstance } from 'vue';
import {noop, getPropByPath, objectAssign} from '../lc-form/utils'
import AsyncValidator from 'async-validator';
type RuleItemType = Partial<{
  required?: boolean;
  size: 'large' | '';
  len: number;
  min:number;
  max:number;
  type: string;
  message:string;
  trigger: string;
}>

interface FromItemProps {
  label: string;
  name: string;
  rules: RuleItemType[];
  required: boolean;
  size: 'large' | '';
  len: number;
  min:number;
  max:number;
  type: string;
}
const formItemInstance = getCurrentInstance()

const props = defineProps<FromItemProps>()
const formContext = inject('form') as any;
const {model: formModel,rules: formRules} = toRefs(formContext.ctx);
const { name, required, rules: propsRules } = toRefs(props);

// 获取字段的错误信息
const validateMessage = ref<string>('');

const getRules = ()=>{
  let _formRules = toRaw(formRules.value);
  const selfRules = toRaw(propsRules.value) || [];
  const requiredRule = required.value !== undefined && required.value !== false ? { required: !!required.value } : [];
  _formRules = _formRules ? _formRules[name.value] || [] : [];
  return [].concat(selfRules).concat(requiredRule).concat(_formRules) as RuleItemType[];
}

const getFilteredRule = (trigger?: string)=>{
  const rules = getRules();
  return rules.filter(rule => {
    if (!rule?.trigger || trigger === '') return true;
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.indexOf(trigger) > -1;
    } else {
      return rule.trigger === trigger;
    }
  }).map(rule => objectAssign({}, rule));
}

const validate = async (trigger: string = '', callback = noop)=>{
  const rules = getFilteredRule(trigger);
  if ((!rules || rules.length === 0) && required.value === undefined) {
    callback();
    return true;
  }

  const descriptor = {};
  if (rules && rules.length > 0) {
    rules.forEach(rule => {
      delete rule.trigger;
    });
  }
  descriptor[name.value] = rules;

  const validator = new AsyncValidator(descriptor);
  const model = {};
  model[name.value] = fieldValue.value;
  validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
    validateMessage.value = errors ? errors[0].message || '' : '';

    callback(validateMessage.value, invalidFields);
    formContext && formContext.emit('validate', name.value, !errors, validateMessage.value || null)
  });
}

const fieldValue = computed(()=>{
  const model = formModel.value;
  if (!model || !name.value) { return; }

  let path = name.value;
  if (path.indexOf(':') !== -1) {
    path = path.replace(/:/, '.');
  }
  return getPropByPath(model, path, true).v;
})

watch(()=>fieldValue.value, ()=>{
  validate('change');
})

onMounted(()=>{
  formContext.exposed?.registerField(formItemInstance)
})

onUnmounted(() => {
  formContext.exposed?.removeField(formItemInstance)
})

defineExpose({
  validate
})
</script>

<style lang="scss" scoped>
</style>