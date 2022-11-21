<script setup>
import { storeToRefs } from 'pinia';
import SmothieCard from '../components/SmothieCard.vue';
import { useSmoothiesStore } from '../store/Smoothie'

const smoothieStore = useSmoothiesStore();
const { smoothiesData, smoothiesError } = storeToRefs(smoothieStore)

</script>

<template>
  <main>
    <h2>Home</h2>
    <div v-if="smoothiesError" class="error">
      {{ smoothiesError }}
    </div>
    <div class="smoothie-section" v-if="!smoothiesError">
      <div v-for="smoothie in smoothiesData" :key="smoothie.id" class="card">
        <SmothieCard :smoothie="smoothie" />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 1rem;
}

.smoothie-section {
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.error {
  margin: 1rem 0;
  font-weight: 500;
}

@media screen and (min-width: 641px) {
  .smoothie-section {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (min-width: 1024px) {
  .smoothie-section {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
