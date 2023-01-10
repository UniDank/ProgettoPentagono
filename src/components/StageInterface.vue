<template>
    <div class="rpgui-content">
        <div class="top-0 left-0 flex flex-col justify-between h-full p-1 rpgui-container" :class="{'pointer-events-none' : textShown}">
            <button :disabled="stage.playedStages.includes(stage.selectedNode)" class="!py-3 !px-12 rpgui-button" type="button" @click="startBattle">
                <h4 v-html="startText" />
            </button>
            <div class="rpgui-container mt-1 !static framed right-2">
                <div v-for="(player, index) in main.party" class="!flex gap-1" :style="`top: ${index == 0 ? 0.25 : (index * 4.25) + 0.25}rem;`">
                    <div class="!static rpgui-container cool !p-0 h-16 w-16">
                        <img :src="`/boxes/${player.name.toLowerCase()}_box.png`" />
                    </div>
                    <div class="flex flex-col w-32 gap-1">
                        <p class="h-4 leading-none">{{ player.name }}</p>
                        <div class="rpgui-progress !h-4">
                            <div class="rpgui-progress-track !h-4 !left-4 !right-4">
                                <div class="rpgui-progress-fill !top-[3px] !bottom-[3px] red" :style="`width: ${player.health / player.maxHealth * 100}%;`"></div>
                            </div>
                            <div class="!h-4 !w-4 rpgui-progress-left1-edge"></div>
                            <div class="!h-4 !w-4 rpgui-progress-right-edge"></div>
                        </div>
                        <div class="rpgui-progress !h-4">
                            <div class="rpgui-progress-track !h-4 !left-4 !right-4">
                                <div class="rpgui-progress-fill !top-[3px] !bottom-[3px] blue" :style="`width: ${player.mana / player.maxMana * 100}%;`"></div>
                            </div>
                            <div class="!h-4 !w-4 rpgui-progress-left3-edge"></div>
                            <div class="!h-4 !w-4 rpgui-progress-right-edge"></div>
                        </div>
                    </div>
                </div>
            </div>
            <button class="!py-3 !px-12 relative !overflow-visible rpgui-button" type="button" @click="openInventory">
                <h3>Inventario</h3>
                <InventoryComp ref="invComp" />
            </button>
            <button class="!py-3 !px-12 rpgui-button" type="button" @click="openSummary"><h3>Glossario</h3></button>
            <button class="!py-3 !px-12 rpgui-button relative !overflow-visible" type="button" @click="openSettings">
                <h3>Impostazioni</h3>
                <div v-show="showSettings" @click.stop 
                    class="flex flex-col rpgui-container framed !left-[calc(100%+0.5rem)] !absolute !bottom-0 !z-30">
                    <h1 data-text="Opzioni di gioco" class="text-stroke-3">Opzioni di gioco</h1>
                    <div class="flex gap-4">
                        <h2 data-text="Risoluzione:" class="text-stroke-3">Risoluzione:</h2>
                        <div class="flex flex-col">
                            <input class="rpgui-checkbox" type="checkbox" name="fullscreen">
                            <label for="fullscreen">Schermo intero</label>
                            <select class="text-lg rpgui-dropdown lg:text-2xl rpgui-cursor-point">
                                <option value="1920x1080" class="text-lg !rpgui-cursor-point lg:text-2xl">1920 x 1080</option>
                                <option value="1280x720" class="text-lg !rpgui-cursor-point lg:text-2xl">1280 x 720</option>
                                <option value="1024x768" class="text-lg !rpgui-cursor-point lg:text-2xl">1024 x 768</option>
                                <option value="800x600" selected class="text-lg !rpgui-cursor-point lg:text-2xl">800 x 600</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <h2 data-text="Volume:" class="text-stroke-3">Volume:</h2>
                        <input class="rpgui-slider" type="range" min="0" max="100" value="50">
                    </div>
                </div>
            </button>
            <button class="!py-3 !px-12 rpgui-button" type="button" @click="saveExit"><h3>Salva ed esci</h3></button>
        </div>
        <div class="p-2 top-9 right-7 rpgui-container">
            <h1 class="text-stroke-5" data-text="Regno di Empaizo">Regno di Empaizo</h1>
        </div>
        <div v-if="textShown" class="top-0 left-0 w-full h-full rpgui-container">
            <div class="w-[70%] h-5/6 top-16 left-1/4 rpgui-container !overflow-y-auto framed !p-4">
                <img class="float-left mr-4 rounded-lg" :src="`/stories/${imageShown}`" />
                <h3 class="whitespace-pre-wrap">{{ textShown }}</h3>
                <button class="ml-[87%] rpgui-button" type="button" @click="textShown = ''"><h3>Chiudi</h3></button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import InventoryComp from './Inventory.vue'
    import { ref, reactive } from 'vue'
    import { Player, Characters } from '../classes/Player'
    import { useMainStore } from '../stores/mainStore'
    import { useStageStore } from '../stores/stageStore'
    import { Item, Inventory, ItemType } from '../classes/Inventory'
    import stories from '../assets/stories.json'

    const main = useMainStore()
    const stage = useStageStore()

    const textShown = ref(""), startText = ref("Leggi<br/>la storia"), imageShown = ref("")
    const showSettings = ref(false)
    const invComp = ref<InstanceType<typeof InventoryComp> | null>(null)

    stage.$subscribe((store, vars) => {
        if ([2, 4, 6, 10].includes(vars.selectedNode)) startText.value = "Inizia<br/>la battaglia"
        else if ([1, 9].includes(vars.selectedNode)) startText.value = "Leggi<br/>il tutorial"
        else startText.value = "Leggi<br/>la storia"
    })

    /*fetch("http://localhost:3000/salvataggio/party").then(res => res.json()).then(json => {
        console.log(json)
    })*/
    
    const startBattle = () => {
        if ([2, 4, 6, 10].includes(stage.selectedNode)) main.changeScene('CombatScene')
        else {
            imageShown.value = stories[stage.selectedNode].images[0].name
            textShown.value = stories[stage.selectedNode].text
        }
    }

    const openSummary = () => console.log("open summary")

    const openInventory = () => {
        invComp.value?.toggleInv()
        showSettings.value = false
    }

    const openSettings = () => {
        showSettings.value = !showSettings.value
        invComp.value!.showInv = false
    }

    const saveExit = () => main.changeScene('BootScene')
</script>