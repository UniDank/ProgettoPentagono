<template>
    <div class="rpgui-content">
        <div class="top-0 left-0 flex flex-col justify-between h-full p-1 rpgui-container">
            <button :disabled="stage.playedStages.includes(stage.selectedNode)" class="!py-3 !px-12 rpgui-button" type="button" @click="startBattle">
                <h4>Inizia<br/>la battaglia</h4>
            </button>
            <div class="rpgui-container mt-1 !static framed right-2">
                <div v-for="(player, index) in party" class="!flex gap-1" :style="`top: ${index == 0 ? 0.25 : (index * 4.25) + 0.25}rem;`">
                    <div class="!static rpgui-container cool !p-0 h-16 w-16">
                        <img :src="`/players/pg_box_${player.pid}.png`" />
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
                            <div class="!h-4 !w-4 rpgui-progress-left2-edge"></div>
                            <div class="!h-4 !w-4 rpgui-progress-right-edge"></div>
                        </div>
                    </div>
                </div>
            </div>
            <button class="!py-3 !px-12 relative !overflow-visible rpgui-button" type="button" @click="invComp?.toggleInv()">
                <h3>Inventario</h3>
                <InventoryComp ref="invComp" />
            </button>
            <button class="!py-3 !px-12 rpgui-button" type="button" @click="openSummary"><h3>Glossario</h3></button>
            <button class="!py-3 !px-12 rpgui-button" type="button" @click="openSettings"><h3>Impostazioni</h3></button>
            <button class="!py-3 !px-12 rpgui-button" type="button" @click="saveExit"><h3>Salva ed esci</h3></button>
        </div>
        <div class="p-2 top-9 right-7 rpgui-container">
            <h1>Regno di Empaizo</h1>
        </div>
        <div v-if="textShown" class="w-[70%] h-5/6 top-16 left-1/4 rpgui-container framed !p-4">
            <button class="rpgui-button" type="button" @click="textShown = ''"><h4>Chiudi</h4></button>
            <h3 class="whitespace-pre-wrap">{{ textShown }}</h3>
        </div>
    </div>
</template>

<script setup lang="ts">
    import InventoryComp from './Inventory.vue'
    import { ref, reactive } from 'vue'
    import { Player, Characters } from '../classes/Player'
    import { useMainStore } from '../stores/mainStore'
    import { useStageStore } from '../stores/stageStore'
    import { Item, Inventory } from '../classes/Inventory'
    import stories from '../assets/stories.json'

    const main = useMainStore()
    const stage = useStageStore()

    const textShown = ref("")
    const invComp = ref<InstanceType<typeof InventoryComp> | null>(null)

    const party = reactive<Player[]>([ 
        new Player(Characters.Agoraco, 12, 10), 
        new Player(Characters.Danblos, 10, 10), 
        new Player(Characters.Marcurion, 11, 10), 
        new Player(Characters.Gioxon, 14, 10), 
        new Player(Characters.Claphos, 18, 10) 
    ])

    /*fetch("http://localhost:3000/salvataggio/party").then(res => res.json()).then(json => {
        console.log(json)
    })*/

    main.party = party

    const inventory = reactive<Inventory>(new Inventory([
        new Item("Vita", 0, 5), new Item("Cuore", 0, 1), new Item("Battito", 0, 3), 
        new Item("Mana", 1, 3), new Item("Merda", 1, 4), new Item("Shish", 1, 8), 
        new Item("Lel", 1, 1), new Item("Lil", 1, 9), new Item("Lul", 1, 24)
    ]))

    main.inventory = inventory
    
    const startBattle = () => {
        if ([2, 4, 6, 10].includes(stage.selectedNode)) main.changeScene('CombatScene')
        else textShown.value = stories[stage.selectedNode].text[0]
    }

    const openSummary = () => console.log("open summary")

    const openSettings = () => console.log("open settings")

    const saveExit = () => {
        main.changeScene('BootScene')
    }
</script>