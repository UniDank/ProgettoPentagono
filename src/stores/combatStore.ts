import { defineStore } from 'pinia'
import { Enemy } from '../classes/Enemy'
import { ClassType } from '../classes/Entity'
import { Player } from '../classes/Player'
import { ref } from 'vue'

export const useCombatStore = defineStore('combat', () => {
    const moveMode = ref(false)
    const moveDirection = ref("")
    const isConfirmed = ref(false)
    const currentEntity = ref<Enemy | Player>()
    const enemies = ref<Enemy[]>([
        new Enemy("Bidoof", 20, 10, 5, 5, 3, 20, ClassType.Tank),
        new Enemy("Ekans", 25, 10, 10, 7, 6, 20, ClassType.Thief),
        new Enemy("Starly", 23, 10, 7, 6, 2, 20, ClassType.Mage),
        new Enemy("Starly 1", 23, 10, 7, 6, 2, 20, ClassType.Mage)
    ])
    const combatLog = ref("")
    const isMoving = ref(false)
    const isCheckingRange = ref(false)
    const currentTurn = ref(0)
    const inRangeEntities = ref<(Enemy | Player)[]>([])
    const orderTurn = ref<(Enemy | Player)[]>([])

    const changeMoveToMouse = () => {
        moveMode.value = true
        moveDirection.value = ""
    }

    const changeMoveToKeys = () => moveMode.value = false

    const toggleMoveMode = () => moveMode.value = !moveMode.value

    const actionMove = (move: boolean) => isMoving.value = move

    const actionInRange = (checkingRange : boolean) => isCheckingRange.value = checkingRange

    const updateEnemies = (list: Enemy[]) => enemies.value = list

    const updateCombatLog = (value: string) => combatLog.value += value

    const passTurn = () => currentTurn.value += 1

    const actionAttack = (targetName: Player | Enemy) => {}

    const actionWin = (winners: boolean) => {}

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
        combatLog,
        actionMove,
        isMoving,
        orderTurn,
        currentTurn,
        updateEnemies,
        updateCombatLog,
        inRangeEntities,
        actionInRange,
        isCheckingRange,
        passTurn,
        actionWin
    }
})