<script setup lang="ts">
  import PhaserContainer from './components/PhaserContainer.vue'
</script>

<template>
  <PhaserContainer />
</template>

<style>
  @font-face {
    font-family: Alagard;
    src: url('./game/assets/alagard.ttf');
    font-style: normal;
    font-weight: normal;
  }

  * {
    margin: 0 !important;
    padding: 0 !important;
  }

  html, body {
    width: 100%;
    height: 100%;
    background-color: #282c34;
    overflow: hidden;
  }
</style>