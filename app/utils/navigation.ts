import type { RouteMap } from "vue-router"

/** Элемент навигации */
interface NavigationItem {
  /** Имя страницы */
  routeName: keyof RouteMap
  /** Заголовок страницы */
  title: string
}

/** Навигация */
export const navigation: NavigationItem[] = [
  { routeName: "index", title: "Главная" },
  { routeName: "convert", title: "Конвертация" },
]
