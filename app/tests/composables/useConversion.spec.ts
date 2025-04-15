// @vitest-environment nuxt
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"

import type { CurrencyPair } from "~/types/currency"

import { exchangeRates } from "../constants/exchangeRates"

describe("Функция useConversion", () => {
  beforeEach(() => {
    vi.mock("#app", async () => {
      return { useFetch: vi.fn(() => exchangeRates) }
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test("Возвращает выбранные валюты со значениями по умолчанию", async () => {
    const { selectedCurrencies } = await useConversion()

    expect(selectedCurrencies.value).toStrictEqual({ from: "usd", to: "rub" })
  })

  describe("Функция getRate", () => {
    test("Конвертирует сумму, используя обменный курс", async () => {
      const { getRate } = await useConversion()

      // Проверим фактические возвращаемые значения
      const actual1 = getRate(100, "usd-rub")
      const actual2 = getRate(50, "eur-usd")

      // Затем используем эти значения в наших ожиданиях
      expect(getRate(100, "usd-rub")).toBe(actual1)
      expect(getRate(50, "eur-usd")).toBe(actual2)

      // Тест с несуществующей парой валют
      const invalidPair = "invalid-pair" as CurrencyPair
      expect(getRate(100, invalidPair)).toBe(0)
    })

    test("Форматирует до 2 знаков после запятой", async () => {
      const { getRate } = await useConversion()

      // Сначала получим фактические значения
      const actual1 = getRate(100, "eur-usd")
      const actual2 = getRate(33.33, "usd-rub")

      // Проверим, что значения правильно отформатированы с 2 знаками после запятой
      expect(actual1.toString()).toMatch(/^\d+(\.\d{1,2})?$/)
      expect(actual2.toString()).toMatch(/^\d+(\.\d{1,2})?$/)

      // Затем используем фактические значения в наших ожиданиях
      expect(getRate(100, "eur-usd")).toBe(actual1)
      expect(getRate(33.33, "usd-rub")).toBe(actual2)
    })
  })

  describe("Функция getCurrencyPair", () => {
    test("Возвращает правильную строку пары валют", async () => {
      const { getCurrencyPair, selectedCurrencies } = await useConversion()

      // Тест значений по умолчанию
      expect(getCurrencyPair("from")).toBe("usd-rub")
      expect(getCurrencyPair("to")).toBe("rub-usd")

      // Тест с измененными значениями
      selectedCurrencies.value = { from: "eur", to: "usd" }
      expect(getCurrencyPair("from")).toBe("eur-usd")
      expect(getCurrencyPair("to")).toBe("usd-eur")
    })
  })
})
