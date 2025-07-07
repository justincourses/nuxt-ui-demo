<script setup lang="ts">
definePageMeta({
  layout: 'vue'
})

const list = ref([
  { id: 1, title: 'My journey with Vue', src: "https://eldenring.bn-ent.net/images/common/img_concept_01.jpg" },
  { id: 2, title: 'Blogging with Vue', src: "https://pub-876fef8da0214a97b8320f2b5ae08dfa.r2.dev/ribenminsu.jpg" },
  { id: 4, title: 'Why Vue is so fun' },
  { id: 5, title: 'Why Vue is so fun' }
])

const func = (item) => {
  alert(JSON.stringify(item))
}
</script>

<template>
  <div>
    <VueWorldHello v-for="item in list" :key="item.id" :item="item" @showitem="func" />
    <div v-for="(item, index) in Array.from({ length: 5 })" :key="index">Vue Page - {{ index }}</div>
    <VueNuxtUiHello />
  </div>
</template>
