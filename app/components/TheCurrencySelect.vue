<script setup lang="ts">
const currencyStore = useCurrencyStore()
</script>

<template>
  <USelect
    v-model="currencyStore.selectedCurrency"
    class="w-24 uppercase"
    :content="{ align: 'end', side: 'bottom' }"
    :items="currencyStore.currencyList"
    size="lg"
    :ui="{ itemLabel: 'uppercase' }"
  />
</template>
