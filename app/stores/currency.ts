import { defineStore } from "pinia"

import type { Currency } from "~/types/currency"

export const useCurrencyStore = defineStore("currency", () => {
  /** Список валют */
  const currencyList = ["rub", "usd", "eur"] as const satisfies Currency[]

  /** Выбранная валюта */
  const selectedCurrency = ref<Currency>("rub")

  /**
   * Установить валюту
   *
   * @param value - Валюта
   */
  function setCurrency(value: Currency) {
    selectedCurrency.value = value
  }

  return { currencyList, selectedCurrency, setCurrency }
})
