<script setup lang="ts">
defineProps(['item'])
defineEmits(['showitem'])
</script> -

<template>
  <h1 class="text-3xl font-bold text-indigo-700">World Hello - {{ item.id }} - {{ item.title }}</h1>
  <img
    :src="item.src"
    :alt="item.title" >
  <div>
    <Button @click="$emit('showitem', item) ">显示 {{ item.title }} 的详情</Button>
  </div>
</template>

<style scoped>
h1 {
  font-size: 1.5em;
}
</style>
