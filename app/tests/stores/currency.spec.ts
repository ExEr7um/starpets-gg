// @vitest-environment node
import { useCurrencyStore } from "@/stores/currency"
import { createPinia, setActivePinia } from "pinia"
import { beforeEach, describe, expect, test } from "vitest"

describe("Хранилище currency", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test("Хранит список валют", () => {
    const store = useCurrencyStore()
    expect(store.currencyList).toBeDefined()
  })

  test("Хранит выбранную валюту", () => {
    const store = useCurrencyStore()
    expect(store.selectedCurrency).toBeDefined()
  })

  test("Устанавливает валюту", () => {
    const store = useCurrencyStore()
    store.setCurrency("usd")
    expect(store.selectedCurrency).toBe("usd")
  })
})
