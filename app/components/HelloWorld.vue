<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '~/components/ui/button'

defineProps<{ msg: string }>()

const count = ref(0)
const show = ref(false)

const reset = () => {
  count.value = 0
}

const setValue = (event: Event) => {
  count.value = Number((event.target as HTMLInputElement).value)
}
</script>

<template>
  <div>
    <h1 v-if="show">HelloWorld {{ msg }}</h1>
    <div>
      <Button @click="show = !show">Toggle</Button>
    </div>

    <div class="card">
      <Button variant="destructive" @click="reset">count is {{ count }}</Button>

      <input :value="count" type="text" @input="setValue">
    </div>
    <p>
      Learn more about IDE Support for Vue in the
      <a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank">Vue Docs Scaling up Guide</a>.
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  </div>
</template>
