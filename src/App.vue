<script setup lang="ts">
  import MainMenu from './components/MainMenu.vue'
  import DebugInterface from './components/DebugInterface.vue'
  import CombatInterface from './components/CombatInterface.vue'
  import StageInterface from './components/StageInterface.vue'
  import DialogueInterface from './components/DialogueInterface.vue'

  import { onMounted, onUnmounted, ref, computed } from 'vue'
  import { launch } from './game/game'

  import { useMainStore } from './stores/mainStore'

  const sceneStore = useMainStore()
  const selectedInterface = ref(0)

  sceneStore.$onAction(({ name, args }) => {
    if (name === 'changeScene' && args[0] == 'BootScene') selectedInterface.value = 1
    if (name === 'changeScene' && args[0] == 'StageScene') selectedInterface.value = 2
    if (name === 'changeScene' && args[0] == 'CombatScene') selectedInterface.value = 3
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
  <MainMenu v-if="selectedInterface == 1" />
  <!--<DebugInterface />-->
  <DialogueInterface />
  <StageInterface v-if="selectedInterface == 2" />
  <CombatInterface v-if="selectedInterface == 3" />
</template>

<style>
  @import url('./assets/main.css');
  @import url('./assets/rpgui.css');
</style>