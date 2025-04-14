<script setup lang="ts">
import type { Currency } from "~/types/currency"

defineProps<{
  /** Валюта */
  currency: Currency
  /** Курс валюты */
  rate: number | undefined
}>()

const currencyStore = useCurrencyStore()
</script>

<template>
  <UCard>
    <h2 class="flex gap-x-1">
      <span>{{ rate }}</span>
      <span class="text-neutral-500 uppercase">
        {{ currencyStore.selectedCurrency }}
      </span>
    </h2>
    <p class="text-base uppercase">1 {{ currency }}</p>
  </UCard>
</template>
