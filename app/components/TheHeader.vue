<template>
  <UCard>
    <div class="flex items-center justify-between">
      <nav class="flex gap-x-4">
        <ULink
          v-for="link in navigation"
          :key="link.routeName"
          :to="{ name: link.routeName }"
        >
          {{ link.title }}
        </ULink>
      </nav>
      <TheCurrencySelect />
    </div>
  </UCard>
</template>
