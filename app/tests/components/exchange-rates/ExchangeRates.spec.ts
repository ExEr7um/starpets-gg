// @vitest-environment nuxt
import type { VueWrapper } from "@vue/test-utils"

import { mountSuspended } from "@nuxt/test-utils/runtime"
import { afterEach, beforeEach, describe, expect, test } from "vitest"

import ExchangeRates from "~/components/exchange-rates/ExchangeRates.vue"
import ExchangeRatesCard from "~/components/exchange-rates/ExchangeRatesCard.vue"

describe("ExchangeRates", () => {
  let wrapper: VueWrapper

  const exchangeRatesCards = () => wrapper.findAllComponents(ExchangeRatesCard)

  beforeEach(async () => {
    wrapper = await mountSuspended(ExchangeRates)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  test("Отображается список валют", () => {
    const store = useCurrencyStore()

    expect(exchangeRatesCards()).toHaveLength(store.currencyList.length - 1)
  })

  test("Список валют фильтруется по выбранной валюте", () => {
    const store = useCurrencyStore()

    const currencies = exchangeRatesCards().map((card) =>
      card.props("currency"),
    )

    expect(currencies).not.toContain(store.selectedCurrency)
  })
})
