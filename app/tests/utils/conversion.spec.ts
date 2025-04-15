// @vitest-environment node
import { describe, expect, test } from "vitest"

describe("Функция getOppositeField", () => {
  test("Возвращает противоположное поле ввода, при значении `from`", () => {
    expect(getOppositeField("from")).toBe("to")
  })

  test("Возвращает противоположное поле ввода, при значении `to`", () => {
    expect(getOppositeField("to")).toBe("from")
  })
})
