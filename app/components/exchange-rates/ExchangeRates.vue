<script setup lang="ts">
import type { ExchangeRate } from "~/types/currency"

const currencyStore = useCurrencyStore()

const { data: exchangeRates } = await useFetch<ExchangeRate>("/currency/", {
  baseURL: "https://status.neuralgeneration.com/api",
})

const exchangeRatesList = computed(() => {
  return currencyStore.currencyList.filter(
    (currency) => currency !== currencyStore.selectedCurrency,
  )
})
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <ExchangeRatesCard
      v-for="currency in exchangeRatesList"
      :key="currency"
      :currency
      :rate="exchangeRates?.[`${currency}-${currencyStore.selectedCurrency}`]"
    />
  </div>
</template>
