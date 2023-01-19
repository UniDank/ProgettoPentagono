import { defineStore } from 'pinia'
import { Enemy, EnemyType } from '../classes/Enemy'
import { Player } from '../classes/Player'
import { ref } from 'vue'

export const useCombatStore = defineStore('combat', () => {
    const moveMode = ref(false)
    const moveDirection = ref("")
    const isConfirmed = ref(false)
    const currentEntity = ref<Enemy | Player>()
    const enemies = ref<Enemy[]>([
        new Enemy("Bidoof", 4, 10, 10, 5, 10, 5, EnemyType.Tank),
        new Enemy("Ekans", 5, 10, 10, 8, 10, 8, EnemyType.Thief),
        new Enemy("Starly", 6, 10, 10, 3, 10, 25, EnemyType.Mage),
        new Enemy("Starly 1", 6, 10, 10, 3, 10, 25, EnemyType.Mage)
    ])
    const combatLog = ref("")
    const selectedEntity = ref(0)
    const isMoving = ref(false)
    const currentTurn = ref(0)
    const orderTurn = ref<(Enemy | Player)[]>([])

    const changeMoveToMouse = () => {
        moveMode.value = true
        moveDirection.value = ""
    }

    const changeMoveToKeys = () => moveMode.value = false

    const toggleMoveMode = () => moveMode.value = !moveMode.value

    const actionAttack = (turnIndex: number) => selectedEntity.value = turnIndex

    const actionMove = (move: boolean) => isMoving.value = move

    const updateEnemies = (list: Enemy[]) => enemies.value = list

    const updateCombatLog = (value: string) => combatLog.value += value

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
        selectedEntity,
        combatLog,
        actionMove,
        isMoving,
        orderTurn,
        currentTurn,
        updateEnemies,
        updateCombatLog
    }
})