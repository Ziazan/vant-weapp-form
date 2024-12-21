<!--
 * @Date: 2024-12-21 12:46:34
 * @LastEditTime: 2024-12-21 14:47:11
 * @Description: 请填写简介
-->
<!-- form-item -->
<template>
  <van-field
    :name="name"
    :label="label"
    :error-message="errorMessage"
    :rules="rules"
    :required="required"
    :size="size"
  >
  <template #input>
    <slot :validate="validate"></slot>
  </template>
  </van-field>
</template>

<script setup lang="ts">
import { inject, toRefs,computed } from 'vue';
import type { PropType } from 'vue'

interface FromItemProps {
  label: string;
  name: string;
  rules: Record<string,any>[];
  required: boolean;
  size: 'large' | '';
  len: number;
  min:number;
  max:number;
  type: string;
}
const props = defineProps<FromItemProps>()
const formContext = inject('form') as any;
const { formState } = toRefs(formContext);
const { name, required } = toRefs(props);

// 获取字段的错误信息
const errorMessage = computed(() => {
  const errors = formState.value.errors[name.value] || [];
  return errors.length? errors[0].message : '';
});
const isError = computed(() => errorMessage.value.length > 0);

const validate = ()=>{
  console.log('%c [ name.value ]-51', 'font-size:13px; background:pink; color:#bf2c9f;', name.value)
  formContext.validate(name.value)
}
</script>

<style lang="scss" scoped>

</style>