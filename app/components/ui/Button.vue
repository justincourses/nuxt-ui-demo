<script setup lang="ts">
import { cn } from '~/utils/cn'
import { computed, defineProps } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
  },
})

const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 px-4 py-2';
const variants: Record<string, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'underline-offset-4 hover:underline text-primary',
};

const classes = computed(() => cn(base, variants[props.variant] || variants.default));
</script>

<template>
  <button :class="classes">
    <slot />
  </button>
</template>
