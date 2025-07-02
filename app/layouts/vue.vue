<template>
  <div class="main-container layout-vue">
    <slot />
    <div class="flex items-center gap-4">
      <USkeleton class="h-12 w-12 rounded-full" />

      <div class="grid gap-2">
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[200px]" />
      </div>
    </div>
    <VueSlider />
    <VueTable />
    <VueCal />
  </div>
</template>
