import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCombatStore = defineStore('combat', () => {
    const moveMode = ref(true)
    const moveDirection = ref("")
    const isConfirmed = ref(false)

    const changeMoveToMouse = () => moveMode.value = true

    const changeMoveToKeys = () => moveMode.value = false

    const toggleMoveMode = () => moveMode.value = !moveMode.value

    return { moveMode, changeMoveToMouse, changeMoveToKeys, toggleMoveMode, moveDirection, isConfirmed }
})