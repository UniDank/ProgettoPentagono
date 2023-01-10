import { defineStore } from 'pinia'
import { Enemy } from '../classes/Enemy'
import { Player } from '../classes/Player'
import { ref } from 'vue'

export const useCombatStore = defineStore('combat', () => {
    const moveMode = ref(true)
    const moveDirection = ref("")
    const isConfirmed = ref(false)
    const currentEntity = ref<Enemy | Player>()
    const enemies = ref<Enemy[]>()
    const selectedEntity = ref(0)

    const changeMoveToMouse = () => {
        moveMode.value = true
        moveDirection.value = ""
    }

    const changeMoveToKeys = () => moveMode.value = false

    const toggleMoveMode = () => moveMode.value = !moveMode.value

    const actionAttack = (turnIndex: number) => selectedEntity.value = turnIndex

    return { 
        moveMode, 
        changeMoveToMouse, 
        changeMoveToKeys, 
        toggleMoveMode, 
        moveDirection, 
        isConfirmed, 
        actionAttack, 
        currentEntity, 
        enemies,
        selectedEntity
    }
})