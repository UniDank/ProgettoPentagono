import { defineStore } from 'pinia'
import { Item, ItemType } from '../classes/Inventory'
import { Player } from '../classes/Player'
import { ClassType } from '../classes/Entity'
import { ref } from 'vue'

export const useMainStore = defineStore('main', () => {
    const currentScene = ref("")
    const currentInterface = ref("")
    const showedDialogue = ref("")
    const mainPlayer = ref("fede")
    const currentVolume = ref(1)
    const party = ref<Player[]>([ 
        new Player("Agoraco", 15, 15, 30, 10, 3, 10, ClassType.Melee), 
        new Player("Danblos", 15, 15, 30, 10, 5, 10, ClassType.Mage), 
        new Player("Marcurion", 15, 15, 30, 10, 10, 10, ClassType.Thief), 
        new Player("Gioxon", 15, 15, 30, 10, 4, 10, ClassType.Archer), 
        new Player("Claphos", 15, 15, 30, 10, 2, 10, ClassType.Tank) 
    ])
    const inventory = ref<Item[]>([
        new Item("Vita", ItemType.Health, 20, 10), new Item("Mana", ItemType.Mana, 15, 10), 
        new Item("Energia", ItemType.Energy, 10, 10),
    ])

    const changeScene = (scene: string) => currentScene.value = scene

    const changeInterface = (userInterface: string) => currentInterface.value = userInterface

    const closeInterface = () => currentInterface.value = ""
    
    const showDialogue = (dialogue: string) => showedDialogue.value = dialogue

    const changeVolume = (perc: number) => currentVolume.value = perc

    return { 
        changeScene, 
        showDialogue, 
        currentScene, 
        party, 
        inventory, 
        mainPlayer, 
        currentInterface, 
        changeInterface, 
        closeInterface,
        changeVolume,
        currentVolume
    }
})