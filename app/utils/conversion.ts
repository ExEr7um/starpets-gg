/**
 * Возвращает противоположное поле ввода
 *
 * @param fieldType - Тип поля ввода (`from` или `to`)
 * @returns Противоположное поле ввода
 */
export function getOppositeField(fieldType: "from" | "to") {
  return fieldType === "from" ? "to" : "from"
}
