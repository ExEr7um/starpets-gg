// @vitest-environment nuxt
import type { VueWrapper } from "@vue/test-utils"

import { useCurrencyStore } from "@/stores/currency"
import { mountSuspended } from "@nuxt/test-utils/runtime"
import { afterEach, beforeEach, describe, expect, test } from "vitest"

import TheCurrencySelect from "~/components/TheCurrencySelect.vue"

describe("Компонент TheCurrencySelect", () => {
  let wrapper: VueWrapper
  const store = useCurrencyStore()

  const select = () => wrapper.findComponent({ name: "USelect" })

  beforeEach(async () => {
    wrapper = await mountSuspended(TheCurrencySelect)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  test("Отображается список валют", () => {
    expect(select().props("items")).toStrictEqual(store.currencyList)
  })

  test("Отображается выбранная валюта", () => {
    expect(select().props("modelValue")).toBe("rub")
  })

  test("При выборе валюты, в store сохраняется новое значение", async () => {
    await select().vm.$emit("update:modelValue", "usd")
    expect(store.selectedCurrency).toBe("usd")
  })
})
