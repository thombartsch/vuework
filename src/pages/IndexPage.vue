<template>
  <q-page class="flex flex-center">
    <div style="width: 100%; max-width: 640px" class="q-pa-lg">
      <div class="text-h6 q-mb-md">Select Countries</div>
      <CountrySelector />
    </div>
  </q-page>
</template>

<script setup>
import CountrySelector from 'components/CountrySelector.vue'
</script>
