<template>
    <p class="fixed left-0 pl-1 text-[#00FF00] top-0 text-stroke-3 z-50 select-none rpgui-cursor-default" 
        :data-text="'FPS: ' + debug.currentFps.toFixed(0)">
        FPS: {{ debug.currentFps.toFixed(0) }}
    </p>
    <button @click="debug.toggleFullscreen" class="fixed top-0 right-0 rpgui-cursor-point">
        <Icon v-if="!debug.isFullscreen" :icon="fsEnter" width="48" height="48" />
        <Icon v-if="debug.isFullscreen" :icon="fsExit" width="48" height="48" />
    </button>
    <button @click="showAllSteps" class="fixed top-0 flex items-center gap-1 right-1/2 rpgui-cursor-point">
        <input type="checkbox" :checked="showAll" />
        <label>Show All</label>
    </button>
    <p class="fixed left-0 pl-1 text-[#00FF00] bottom-0 z-50 text-stroke-3 select-none rpgui-cursor-default" 
        :data-text="'Mouse: x: ' + debug.currentMouse.x.toFixed(0) + ' | y: ' + debug.currentMouse.y.toFixed(0)">
        Mouse: x: {{ debug.currentMouse.x.toFixed(0) }} | y: {{ debug.currentMouse.y.toFixed(0) }}
    </p>
</template>

<script setup lang="ts">
    import { Icon } from '@iconify/vue/dist/offline'
    import { ref } from 'vue'
    import fsEnter from '@iconify-icons/ic/round-fullscreen'
    import fsExit from '@iconify-icons/ic/round-fullscreen-exit'
    import { useDebugStore } from '../stores/debugStore'
    import { useMainStore } from '../stores/mainStore'

    const showAll = ref(false)

    const main = useMainStore()
    const debug = useDebugStore()

    const showAllSteps = () => {
        showAll.value = !showAll.value
        main.shownSteps.fill(showAll.value)
        main.shownSteps[0] = true
    }
</script>