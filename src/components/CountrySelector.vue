<template>
  <div class="country-selector">
    <!-- Chip display area -->
    <div
      class="chip-area q-pa-sm q-mb-md"
      :class="{ 'chip-area--empty': selected.length === 0 }"
    >
      <template v-if="selected.length > 0">
        <q-chip
          v-for="country in selected"
          :key="country"
          removable
          dense
          color="primary"
          text-color="white"
          icon="flag"
          class="q-ma-xs"
          @remove="deselect(country)"
        >
          {{ country }}
        </q-chip>
      </template>
      <span v-else class="text-grey-5 text-caption q-pa-xs">
        No countries selected — use the button below to add some
      </span>
    </div>

    <!-- Trigger button -->
    <q-btn color="primary" icon="public" unelevated>
      <span class="q-ml-xs">Select Countries</span>
      <q-badge v-if="selected.length > 0" color="red" floating rounded>
        {{ selected.length }}
      </q-badge>

      <!-- Menu lives inside the button so Quasar auto-anchors it -->
      <q-menu
        v-model="menuOpen"
        style="min-width: 300px"
        max-height="420px"
        anchor="bottom left"
        self="top left"
        @before-show="search = ''"
      >
        <!-- Search input -->
        <div class="q-pa-sm bg-white sticky-search">
          <q-input
            v-model="search"
            placeholder="Search countries…"
            dense
            outlined
            clearable
            autofocus
            @keydown.stop
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <q-separator />

        <!-- Country list -->
        <q-list dense style="overflow-y: auto; max-height: 300px">
          <q-item v-if="filteredCountries.length === 0" class="text-grey-5 justify-center">
            <q-item-section class="text-center text-caption q-py-sm">
              No results for "{{ search }}"
            </q-item-section>
          </q-item>

          <q-item
            v-for="country in filteredCountries"
            :key="country"
            clickable
            :active="isSelected(country)"
            active-class="bg-blue-1"
            @click.stop="toggle(country)"
          >
            <q-item-section side top>
              <q-checkbox
                :model-value="isSelected(country)"
                color="primary"
                dense
                @click.stop
                @update:model-value="toggle(country)"
              />
            </q-item-section>
            <q-item-section>{{ country }}</q-item-section>
          </q-item>
        </q-list>

        <q-separator />

        <!-- Footer -->
        <div class="q-pa-sm row justify-between items-center bg-grey-1">
          <span class="text-caption text-grey-7">
            {{ selected.length }} selected
          </span>
          <div class="row q-gutter-xs">
            <q-btn
              flat
              dense
              size="sm"
              label="Clear all"
              color="negative"
              :disable="selected.length === 0"
              @click.stop="clearAll"
            />
            <q-btn
              flat
              dense
              size="sm"
              label="Done"
              color="primary"
              @click.stop="menuOpen = false"
            />
          </div>
        </div>
      </q-menu>
    </q-btn>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { COUNTRIES } from './countries'

const selected = ref([])
const search = ref('')
const menuOpen = ref(false)

const filteredCountries = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return COUNTRIES
  return COUNTRIES.filter(c => c.toLowerCase().includes(q))
})

function isSelected (country) {
  return selected.value.includes(country)
}

function toggle (country) {
  if (isSelected(country)) {
    deselect(country)
  } else {
    selected.value.push(country)
  }
}

function deselect (country) {
  selected.value = selected.value.filter(c => c !== country)
}

function clearAll () {
  selected.value = []
}
</script>

<style scoped>
.chip-area {
  min-height: 52px;
  border: 1px dashed #bdbdbd;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  transition: border-color 0.2s;
}

.chip-area:not(.chip-area--empty) {
  border-color: #1976d2;
  border-style: solid;
}

.sticky-search {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>
