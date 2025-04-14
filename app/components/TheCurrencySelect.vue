<script setup lang="ts">
const currencyStore = useCurrencyStore()
</script>

<template>
  <USelect
    v-model="currencyStore.selectedCurrency"
    class="w-20 uppercase"
    :content="{ align: 'end', side: 'bottom' }"
    :items="currencyStore.currencyList"
    :ui="{ itemLabel: 'uppercase' }"
  />
</template>
