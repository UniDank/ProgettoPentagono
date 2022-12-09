<template>
    <div class="rpgui-content">
        <div v-if="currentMenu == 0" class="top-1/2 left-0 pl-8 translate-y-[-25%] rpgui-container">
            <h1 v-for="(text, i) in textButtons"
                @pointerover="overText(i)" @pointerup="clickText(i)" :key="text"
                :class="[selectedBtn == i ? '!text-red-600' : (disabledBtn == i ? '!text-neutral-400' : '!text-white')]"
                class="mb-2 select-none lg:mb-4 w-fit text-stroke-5" :data-text="text">
                {{ text }}
            </h1>
        </div>
        <div v-if="currentMenu == 1" class="bottom-0 left-0 flex flex-col gap-2 p-8 rpgui-container">
            <button class="self-start rpgui-button" type="button" @click="goBack"><h3>Indietro</h3></button>
        </div>
        <div v-if="currentMenu == 3" class="rpgui-container !top-1/3 left-0 pl-8 flex flex-col gap-4">
            <h1 data-text="Opzioni di gioco" class="text-stroke-5">Opzioni di gioco</h1>
            <div class="flex gap-4">
                <h2 data-text="Risoluzione:" class="text-stroke-3">Risoluzione:</h2>
                <div class="flex flex-col">
                    <input class="rpgui-checkbox" @click="toggleFullscreen" v-model="isFullScreen" type="checkbox" name="fullscreen">
                    <label for="fullscreen" class="text-stroke-3" data-text="Schermo intero">Schermo intero</label>
                    <select class="text-lg rpgui-dropdown lg:text-2xl rpgui-cursor-point">
                        <option value="1920x1080" class="text-lg !rpgui-cursor-point lg:text-2xl">1920 x 1080</option>
                        <option value="1280x720" class="text-lg !rpgui-cursor-point lg:text-2xl">1280 x 720</option>
                        <option value="1024x768" class="text-lg !rpgui-cursor-point lg:text-2xl">1024 x 768</option>
                        <option value="720x576" selected class="text-lg !rpgui-cursor-point lg:text-2xl">720 x 576</option>
                    </select>
                </div>
            </div>
            <div class="flex gap-4">
                <h2 data-text="Volume:" class="text-stroke-3">Volume:</h2>
                <input class="rpgui-slider" type="range" min="0" max="100" value="50">
            </div>
            <button class="self-start rpgui-button" type="button" @click="goBack"><h3>Indietro</h3></button>
        </div>
        <div v-if="currentMenu == 4" class="bottom-0 left-0 flex flex-col gap-2 p-8 rpgui-container">
            <button class="self-start rpgui-button" type="button" @click="goBack"><h3>Indietro</h3></button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useBootStore } from '../stores/bootStore'
    import { useMainStore } from '../stores/mainStore'

    const boot = useBootStore()
    const main = useMainStore()

    const isFullScreen = ref(false)

    const textButtons = ['Nuova Partita', 'Continua', 'Opzioni', 'Crediti', 'Esci']
    const selectedBtn = ref(-1)
    const disabledBtn = ref(-1)
    const currentMenu = ref(0)

    const selectAudio = new Audio('./src/game/assets/select_button.mp3')
    const switchAudio = new Audio('./src/game/assets/switch_button.mp3')

    function toggleFullscreen() {
        window.require('electron').ipcRenderer.invoke('toggle-fullscreen', isFullScreen.value)
    }

    function overText(index: number) {
        if (disabledBtn.value == index) return
        if (selectedBtn.value != index) {
            switchAudio.currentTime = 0
            switchAudio.play()
        }
        selectedBtn.value = index
    }

    function goBack() {
        if (main.afterScene != 'BootScene') {
            window.addEventListener('keydown', menuSelect)
            main.changeScene('BootScene')
        }
        currentMenu.value = 0
        selectedBtn.value = -1
    }

    function clickText(index: number) {
        if (disabledBtn.value == index) return
        selectAudio.currentTime = 0
        selectAudio.play()
        switch (index) {
            case 0:
                currentMenu.value = 1
                window.removeEventListener('keydown', menuSelect)
                main.changeScene('SelectScene')
                break;
            case 1:
                currentMenu.value = 2
                main.changeScene('MainScene')
                break;
            case 2:
                currentMenu.value = 3
                break;
            case 3:
                currentMenu.value = 4
                main.showDialogue('ID_DIALOGO')
                break;
            case 4:
                boot.$reset()
                window.require('electron').ipcRenderer.invoke('close-window')
                break;
            default:
                break;
        }
    }

    function menuSelect(e: KeyboardEvent) {
        e.preventDefault()
        if (currentMenu.value == 0) {
            if (['Enter', ' '].includes(e.key)) clickText(selectedBtn.value)
            if (e.key == 'ArrowUp') {
                let index = selectedBtn.value
                if (index <= 0) index = textButtons.length - 1
                else if ((index - 1) == disabledBtn.value) index -= 2
                else index--
                selectedBtn.value = index
                switchAudio.currentTime = 0
                switchAudio.play()
            }
            if (e.key == 'ArrowDown') {
                let index = selectedBtn.value
                if (index >= textButtons.length - 1) index = 0
                else if ((index + 1) == disabledBtn.value) index += 2
                else index++
                selectedBtn.value = index
                switchAudio.currentTime = 0
                switchAudio.play()
            }
        }
    }

    onMounted(() => {
        if (true) { //TODO: Se non c'è alcun salvataggio, disabilitare il bottone 'Continue'
            disabledBtn.value = 1
        }
        window.addEventListener('keydown', menuSelect)
    })
</script>