import { defineStore } from 'pinia'
import { Item, ItemType } from '../classes/Inventory'
import { Player, Characters } from '../classes/Player'
import { ref } from 'vue'

export const useMainStore = defineStore('main', () => {
    const pausedScene = ref('')
    const afterScene = ref('')
    const showedDialogue = ref('')
    const mainPlayer = ref("fede")
    const party = ref<Player[]>([ 
        new Player(Characters[0], 5, 5, 12, 10, 10, 10), 
        new Player(Characters[1], 5, 7, 10, 10, 10, 10), 
        new Player(Characters[2], 5, 6, 11, 10, 10, 10), 
        new Player(Characters[3], 5, 3, 14, 10, 10, 10), 
        new Player(Characters[4], 5, 15, 18, 10, 10, 10) 
    ])
    const inventory = ref<Item[]>([
        new Item("Vita", ItemType.Health, 20, 10), new Item("Mana", ItemType.Mana, 15, 10), 
        new Item("Energia", ItemType.Energy, 10, 10), new Item("Lira", ItemType.Lyre, 1, 1),
    ])

    const changeScene = (scene: string) => afterScene.value = scene

    const pauseScene = (scene: string) => pausedScene.value = scene
    
    const showDialogue = (dialogue: string) => showedDialogue.value = dialogue

    return { pauseScene, changeScene, showDialogue, pausedScene, afterScene, party, inventory, mainPlayer}
})