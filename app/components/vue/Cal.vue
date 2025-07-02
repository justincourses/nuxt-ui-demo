<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'

const value = ref(new CalendarDate(2022, 2, 3))
</script>

<template>
  <UCalendar v-model="value" />
</template>
