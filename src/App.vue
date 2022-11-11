<script setup lang="ts">
  import MainMenu from './components/MainMenu.vue'
  import DebugInterface from './components/DebugInterface.vue'

  import { onMounted, onUnmounted, ref, computed } from 'vue'
  import { launch } from './game/game'

  const gameInstance = ref<Phaser.Game>()
  const computedGame = computed({
    get: () => gameInstance.value,
    set: (value) => gameInstance.value = value
  })
  const containerId = 'game-container'

  onMounted(() => {
    computedGame.value = launch(containerId)
  })

  onUnmounted(() => {
    computedGame.value?.destroy(false)
  })
</script>

<template>
  <div :id="containerId" />
  <DebugInterface />
  <MainMenu />
</template>

<style>
  @import url('/main.css');
  @import url('/rpgui.css');
</style>