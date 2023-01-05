import { defineStore } from 'pinia'
import { Inventory } from '../classes/Inventory'
import { Player } from '../classes/Player'
import { ref } from 'vue'

export const useMainStore = defineStore('main', () => {
    const pausedScene = ref('')
    const afterScene = ref('')
    const showedDialogue = ref('')
    const party = ref<Player[]>([])
    const inventory = ref<Inventory>(new Inventory([]))

    const changeScene = (scene: string) => afterScene.value = scene

    const pauseScene = (scene: string) => pausedScene.value = scene
    
    const showDialogue = (dialogue: string) => showedDialogue.value = dialogue

    return { pauseScene, changeScene, showDialogue, pausedScene, afterScene, party, inventory }
})