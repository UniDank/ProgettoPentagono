import { defineStore } from 'pinia'
import { Enemy } from '../classes/Enemy'
import { ClassType } from '../classes/Entity'
import { Player } from '../classes/Player'
import { ref } from 'vue'

export const useCombatStore = defineStore('combat', () => {
    const moveMode = ref(false)
    const moveDirection = ref("")
    const currentEntity = ref<Enemy | Player>()
    const enemies = ref<Enemy[]>([
        new Enemy("Bidoof", 5, 5, 20, 10, 3, 20, ClassType.Tank),
        new Enemy("Ekans", 10, 7, 25, 10, 6, 20, ClassType.Thief),
        new Enemy("Starly", 7, 6, 23, 10, 9, 30, ClassType.Mage),
        new Enemy("Carnivine", 8, 4, 18, 8, 7, 25, ClassType.Archer)
    ])
    const combatLog = ref("")
    const isMoving = ref(false)
    const isCheckingRange = ref(false)
    const currentTurn = ref(0)
    const inRangeEntities = ref<(Enemy | Player)[]>([])
    const orderTurn = ref<(Enemy | Player)[]>([])

    const toggleMoveMode = () => moveMode.value = !moveMode.value

    const actionMove = (move: boolean) => isMoving.value = move

    const actionInRange = (checkingRange : boolean) => isCheckingRange.value = checkingRange

    const updateEnemies = (list: Enemy[]) => enemies.value = list

    const updateCombatLog = (value: string) => combatLog.value += value

    const passTurn = () => currentTurn.value += 1

    const actionAttack = (targetName: Player | Enemy) => {}

    const actionWin = (winners: boolean) => {}

    const changeDirection = (direction: string) => moveDirection.value = direction

    const confirmMove = () => {}

    return { 
        moveMode,
        toggleMoveMode, 
        moveDirection,
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
        actionWin,
        changeDirection,
        confirmMove
    }
})