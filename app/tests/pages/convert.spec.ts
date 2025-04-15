// @vitest-environment nuxt
import type { VueWrapper } from "@vue/test-utils"

import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"

import convert from "~/pages/convert.vue"

import { exchangeRates } from "../constants/exchangeRates"

describe("Страница конвертации валюты", () => {
  let wrapper: VueWrapper

  const inputs = () => wrapper.findAllComponents({ name: "UInput" })
  const toInput = () => inputs()[0]!.find("input")
  const fromInput = () => inputs()[1]!.find("input")

  const { useFetchMock } = vi.hoisted(() => {
    return { useFetchMock: vi.fn(() => exchangeRates) }
  })

  mockNuxtImport("useFetch", () => {
    return useFetchMock
  })

  beforeEach(async () => {
    wrapper = await mountSuspended(convert)

    vi.mock("#app", async () => {
      return { useFetch: vi.fn(() => exchangeRates) }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  test("При вводе в поле `to`, автоматически конвертируется валюта в поле `from`", async () => {
    await toInput().setValue(100)

    expect(Number(fromInput().element.value)).toBe(
      exchangeRates.data.value["usd-rub"] * 100,
    )
  })

  test("При вводе в поле `from`, автоматически конвертируется валюта в поле `to`", async () => {
    await fromInput().setValue(10_000)

    expect(Number(toInput().element.value)).toBe(
      exchangeRates.data.value["rub-usd"] * 10_000,
    )
  })
})
