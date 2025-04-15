import type { Currency, CurrencyPair, ExchangeRate } from "~/types/currency"

/**
 * Функции для конвертации валюты.
 *
 * @returns Функции для конвертации валюты
 */
export default async function () {
  const { data: exchangeRates } = await useFetch<ExchangeRate>("/currency/", {
    baseURL: "https://status.neuralgeneration.com/api",
  })

  /** Выбранные валюты */
  const selectedCurrencies = ref<{ from: Currency; to: Currency }>({
    from: "usd",
    to: "rub",
  })

  /**
   * Функция для получения курса валюты.
   *
   * @param amount - Сумма для конвертации
   * @param currency - Валюта
   * @returns Курс валюты
   */
  function getRate(amount: number, currency: CurrencyPair) {
    /** Курс валюты */
    const rate = exchangeRates.value?.[currency] ?? 0

    return Number.parseFloat((amount * rate).toFixed(2))
  }

  /**
   * Функция для получения пары валют.
   *
   * @param fieldType - Тип поля ввода (`from` или `to`)
   * @returns Пара валют
   */
  function getCurrencyPair(fieldType: "from" | "to") {
    return `${selectedCurrencies.value[fieldType]}-${selectedCurrencies.value[getOppositeField(fieldType)]}` satisfies CurrencyPair
  }

  return { getCurrencyPair, getRate, selectedCurrencies }
}
