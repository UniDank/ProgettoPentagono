<script setup lang="ts">
  import OptionsMenu from './components/OptionsMenu.vue';
  import PhaserContainer from './components/PhaserContainer.vue'
</script>

<template>
  <PhaserContainer />
  <!--<OptionsMenu />-->
</template>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer components {
    .fixed-center {
			@apply fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
		}
  }

  @font-face {
    font-family: Alagard;
    src: url('./game/assets/alagard.ttf');
    font-style: normal;
    font-weight: normal;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #353535;
    overflow: hidden;
  }
</style>