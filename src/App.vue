<script setup lang="ts">
  import MainMenu from './components/MainMenu.vue'
  import DebugInterface from './components/DebugInterface.vue'
  import DialogueInterface from './components/DialogueInterface.vue'

  import { onMounted, onUnmounted, ref, computed } from 'vue'
  import { launch } from './game/game'

  import { useBootStore } from './stores/bootStore'

  const sceneStore = useBootStore()
  const isBootStarted = ref(false)

  sceneStore.$onAction(({ name, args }) => {
    if (name === 'changeScene') isBootStarted.value = true
  })

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
  <MainMenu v-if="isBootStarted" />
</template>

<style>
  @import url('./assets/main.css');
  @import url('./assets/rpgui.css');
</style>