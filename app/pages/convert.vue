<script setup lang="ts">
import type { InferOutput } from "valibot"

import * as v from "valibot"

import type { Currency } from "~/types/currency"

const currencyStore = useCurrencyStore()

const { getCurrencyPair, getRate, selectedCurrencies } = await useConversion()

const schema = v.object({ fromAmount: v.number(), toAmount: v.number() })
type Schema = InferOutput<typeof schema>

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
    <UForm class="grid grid-cols-[auto_1fr] gap-4" :schema :state>
      <USelect
        class="w-24 uppercase"
        :items="
          currencyStore.currencyList.filter(
            (currency) => currency !== selectedCurrencies.to,
          )
        "
        :model-value="selectedCurrencies.from"
        size="lg"
        :ui="{ itemLabel: 'uppercase' }"
        @update:model-value="selectCurrency('from', $event)"
      />
      <UFormField name="fromAmount" size="lg">
        <UInput
          class="w-full"
          :min="0"
          :model-value="state.fromAmount"
          placeholder="Введите сумму"
          type="number"
          @update:model-value="convertCurrency($event as string, 'from')"
        />
      </UFormField>
      <USelect
        class="w-24 uppercase"
        :items="
          currencyStore.currencyList.filter(
            (currency) => currency !== selectedCurrencies.from,
          )
        "
        :model-value="selectedCurrencies.to"
        size="lg"
        :ui="{ itemLabel: 'uppercase' }"
        @update:model-value="selectCurrency('to', $event)"
      />
      <UFormField name="toAmount" size="lg">
        <UInput
          class="w-full"
          :model-value="state.toAmount"
          placeholder="Введите сумму"
          type="number"
          @update:model-value="convertCurrency($event as string, 'to')"
        />
      </UFormField>
    </UForm>
  </main>
</template>
