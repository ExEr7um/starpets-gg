<script setup lang="ts">
import type { Currency } from "~/types/currency"

const props = defineProps<{
  /** Сумма для конвертации */
  amount: number
  /** Тип поля ввода (from или to) */
  fieldType: "from" | "to"
  /** Другая выбранная валюта для фильтрации в выпадающем списке */
  otherCurrency: Currency
  /** Выбранная валюта */
  selectedCurrency: Currency
}>()

const emit = defineEmits<{
  convertCurrency: [amount: string, fieldType: "from" | "to"]
  selectCurrency: [fieldType: "from" | "to", currency: Currency]
}>()

const currencyStore = useCurrencyStore()
</script>

<template>
  <div class="flex items-start gap-4">
    <USelect
      class="w-24 uppercase"
      :items="
        currencyStore.currencyList.filter(
          (currency) => currency !== props.otherCurrency,
        )
      "
      :model-value="props.selectedCurrency"
      size="lg"
      :ui="{ itemLabel: 'uppercase' }"
      @update:model-value="emit('selectCurrency', props.fieldType, $event)"
    />
    <UFormField class="flex-1" :name="`${props.fieldType}Amount`" size="lg">
      <UInput
        class="w-full"
        :min="0"
        :model-value="props.amount"
        placeholder="Введите сумму"
        type="number"
        @update:model-value="
          emit('convertCurrency', $event as string, props.fieldType)
        "
      />
    </UFormField>
  </div>
</template>
