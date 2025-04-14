<template>
  <div class="flex h-screen flex-col items-center justify-center gap-4">
    <h1 class="text-2xl font-bold text-(--ui-primary)">Nuxt UI - Starter</h1>

    <div class="flex items-center gap-2">
      <UButton
        icon="i-lucide-square-play"
        label="Documentation"
        target="_blank"
        to="https://ui.nuxt.com/getting-started/installation/nuxt"
      />

      <UButton
        color="neutral"
        icon="i-simple-icons-github"
        label="GitHub"
        target="_blank"
        to="https://github.com/nuxt/ui"
        variant="outline"
      />
    </div>
  </div>
</template>
