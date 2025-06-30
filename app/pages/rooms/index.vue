<script setup lang="ts">
definePageMeta({
  layout: 'room'
})

const rooms = ref([
  { id: 1, name: 'Room 1' },
  { id: 2, name: 'Room 2' }
])
</script>

<template>
  <div>
    <h1>Room List</h1>
    <ul>
      <ul>
        <li v-for="room in rooms" :key="room.id">
          <NuxtLink :to="`/rooms/${room.id}`">
            {{ room.name }}
            <img :src="`/rooms/${room.id}.jpeg`" :alt="`room ${room.id}`">
          </NuxtLink>
        </li>
      </ul>
    </ul>
  </div>
</template>
