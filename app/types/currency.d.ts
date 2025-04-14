/** Валюта */
export type Currency = "eur" | "rub" | "usd"

/** Курсы валют */
export type ExchangeRate = Record<`${Currency}-${Currency}`, number>
