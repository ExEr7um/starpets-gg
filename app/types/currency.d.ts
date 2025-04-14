/** Валюта */
export type Currency = "eur" | "rub" | "usd"

/** Пара валют */
export type CurrencyPair = `${Currency}-${Currency}`

/** Курсы валют */
export type ExchangeRate = Record<CurrencyPair, number>
