import type { VueWrapper } from "@vue/test-utils"

import { createTestingPinia } from "@pinia/testing"
import { mount } from "@vue/test-utils"
import { afterEach, beforeEach, describe, expect, test } from "vitest"

import ExchangeRatesCard from "~/components/exchange-rates/ExchangeRatesCard.vue"

describe("Компонент ExchangeRatesCard", () => {
  let wrapper: VueWrapper

  const rate = 999
  const currency = "usd"

  beforeEach(() => {
    wrapper = mount(ExchangeRatesCard, {
      global: { plugins: [createTestingPinia()] },
      props: { currency, rate },
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  test("Отображается курс валюты", () => {
    const store = useCurrencyStore()
    const h2 = wrapper.find("h2")

    expect(h2.text()).toBe(`${rate.toFixed(2)}${store.selectedCurrency}`)
  })

  test("Отображается выбранная валюта", () => {
    const p = wrapper.find("p")

    expect(p.text()).toBe(`1 ${currency}`)
  })
})
