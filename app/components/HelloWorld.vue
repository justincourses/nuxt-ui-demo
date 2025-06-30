<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '~/components/ui/button'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>HelloWorld {{ msg }}</h1>

  <div class="card">
    <Button variant="destructive" @click="count++">count is {{ count }}</Button>
  </div>
  <p>
    Learn more about IDE Support for Vue in the
    <a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank">Vue Docs Scaling up Guide</a>.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>
