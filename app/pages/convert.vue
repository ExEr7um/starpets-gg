<script setup lang="ts">
import type { InferOutput } from "valibot"

import * as v from "valibot"

import type { Currency } from "~/types/currency"

const { getCurrencyPair, getRate, selectedCurrencies } = await useConversion()

/** Схема валидации */
const schema = v.object({ fromAmount: v.number(), toAmount: v.number() })
/** Тип схемы */
type Schema = InferOutput<typeof schema>

/** Состояние формы */
const state = reactive<Schema>({
  /** Сумма до конвертации */
  fromAmount: 1,
  /** Сумма после конвертации */
  toAmount: getRate(1, getCurrencyPair("from")),
})

/**
 * Функция для конвертации валюты. Обновляет значения в обоих полях ввода.
 *
 * @param amount - Сумма для конвертации
 * @param fieldType - Тип поля ввода (`from` или `to`)
 */
function convertCurrency(amount: string, fieldType: "from" | "to") {
  /** Сумма для конвертации */
  const amountNumber = Number.parseFloat(amount)
  /** Пара валют */
  const currencyPair = getCurrencyPair(fieldType)

  // Обновляем значение в поле ввода, которое было изменено
  state[`${fieldType}Amount`] = amountNumber

  // Обновляем значение в противоположном поле ввода
  state[`${getOppositeField(fieldType)}Amount`] = getRate(
    amountNumber,
    currencyPair,
  )
}

/**
 * Функция для выбора валюты. Обновляет значение в поле ввода и конвертирует валюту.
 *
 * @param fieldType - Тип поля ввода (`from` или `to`)
 * @param currency - Валюта
 */
function selectCurrency(fieldType: "from" | "to", currency: Currency) {
  // Обновляем значение валюты
  selectedCurrencies.value[fieldType] = currency

  // Конвертируем сумму
  convertCurrency(state[`${fieldType}Amount`].toString(), fieldType)
}
</script>

<template>
  <main class="flex flex-col gap-4">
    <h1>Конвертер валют</h1>
    <UForm class="grid gap-4" :schema :state>
      <CurrencyInput
        :amount="state.fromAmount"
        field-type="from"
        :other-currency="selectedCurrencies.to"
        :selected-currency="selectedCurrencies.from"
        @convert-currency="convertCurrency"
        @select-currency="selectCurrency"
      />
      <CurrencyInput
        :amount="state.toAmount"
        field-type="to"
        :other-currency="selectedCurrencies.from"
        :selected-currency="selectedCurrencies.to"
        @convert-currency="convertCurrency"
        @select-currency="selectCurrency"
      />
    </UForm>
  </main>
</template>
