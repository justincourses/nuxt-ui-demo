<script setup lang="ts">
definePageMeta({
  layout: 'room'
})

const route = useRoute()

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id)
</script>

<template>
  <div class="text-center">
    <h1>Rooms {{ route.params.id }} Detail</h1>
    <img :src="`/rooms/${route.params.id}.jpeg`" :alt="`room ${route.params.id}`">
    <HelloWorld :msg="`Room ${route.params.id}`" />
  </div>
</template>
