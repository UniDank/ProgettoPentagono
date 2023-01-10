import { defineStore } from 'pinia'
import { Inventory, Item, ItemType } from '../classes/Inventory'
import { Player, Characters } from '../classes/Player'
import { ref } from 'vue'

export const useMainStore = defineStore('main', () => {
    const pausedScene = ref('')
    const afterScene = ref('')
    const showedDialogue = ref('')
    const mainPlayer = ref('')
    const party = ref<Player[]>([ 
        new Player(Characters[0], 5, 12, 10, 10, 10), 
        new Player(Characters[1], 5, 10, 10, 10, 10), 
        new Player(Characters[2], 5, 11, 10, 10, 10), 
        new Player(Characters[3], 5, 14, 10, 10, 10), 
        new Player(Characters[4], 5, 18, 10, 10, 10) 
    ])
    const inventory = ref<Inventory>(new Inventory([
        new Item("Vita", ItemType.Health, 5, 10), new Item("Cuore", ItemType.Health, 1, 3), new Item("Mana", ItemType.Mana, 3, 6), 
        new Item("Energia", ItemType.Energy, 1, 8), new Item("Lira", ItemType.Lyre, 9, 13),
        new Item("Mana", ItemType.Mana, 3, 10), new Item("Merda", ItemType.Mana, 4, 3), new Item("Shish", ItemType.Mana, 8, 4), 
    ]))

    const changeScene = (scene: string) => afterScene.value = scene

    const pauseScene = (scene: string) => pausedScene.value = scene
    
    const showDialogue = (dialogue: string) => showedDialogue.value = dialogue

    return { pauseScene, changeScene, showDialogue, pausedScene, afterScene, party, inventory, mainPlayer}
})