<template>
    <div class="rpgui-content">
        <div v-for="(player, index) in main.party" class="!flex rpgui-container gap-1 left-1"
            :style="`top: ${index == 0 ? 0.25 : (index * 4.25) + 0.25}rem;`">
            <div class="!static rpgui-container thin !p-0 h-16 w-16">
                <img :src="`/boxes/${player.name.toLowerCase()}_box.png`" />
            </div>
            <div class="flex flex-col w-32 gap-1">
                <p class="h-4 leading-none">{{ player.name }}</p>
                <div class="rpgui-progress !h-[1rem]">
                    <div class="rpgui-progress-track !h-[1rem] !left-4 !right-4">
                        <div class="rpgui-progress-fill !top-[3px] !bottom-[3px] red"
                            :style="`width: ${player.health / player.maxHealth * 100}%;`"></div>
                    </div>
                    <div class="!h-[1rem] !w-4 rpgui-progress-left1-edge"></div>
                    <div class="!h-[1rem] !w-4 rpgui-progress-right-edge"></div>
                </div>
                <div class="rpgui-progress !h-[1rem]">
                    <div class="rpgui-progress-track !h-[1rem] !left-4 !right-4">
                        <div class="rpgui-progress-fill !top-[3px] !bottom-[3px] green"
                            :style="`width: ${player.APs / player.maxAPs * 100}%;`"></div>
                    </div>
                    <div class="!h-[1rem] !w-4 rpgui-progress-left2-edge"></div>
                    <div class="!h-[1rem] !w-4 rpgui-progress-right-edge"></div>
                </div>
            </div>
        </div>
        <div class="flex w-[99%] gap-2 bottom-1 left-1 rpgui-container">
            <div class="flex flex-col">
                <button class="relative !overflow-visible rpgui-button" type="button" @click="actionAttack" :disabled="(combat.currentEntity instanceof Enemy)">
                    <h3>Attacca</h3>
                    <div v-show="showAttack" @click.stop
                        class="rpgui-container framed !left-[calc(100%+0.5rem)] !absolute !bottom-0 !z-30 flex flex-col !h-auto w-52 justify-between !p-0">
                        <div v-for="enemy in combat.inRangeEntities"
                            @click="attackEnemy(enemy)"
                            class="flex items-center gap-2 px-1 py-1 hover:bg-black/75">
                            <img :src="`/boxes/${enemy.name.slice(0, enemy.name.lastIndexOf(' ') != -1 ? enemy.name.lastIndexOf(' ') : undefined).toLowerCase()}_box.png`" class="w-8 h-8" />
                            <h5>{{ enemy.name }}</h5>
                        </div>
                        <h4 v-if="combat.inRangeEntities.length == 0" class="text-center">Nessun nemico nelle vicinanze!</h4>
                    </div>
                </button>
                <button class="relative !overflow-visible rpgui-button" type="button" @click="actionMove" :disabled="(combat.currentEntity instanceof Enemy)">
                    <h3>Muoviti</h3>
                    <div v-show="showMove" @click.stop
                        class="rpgui-container framed !left-[calc(100%+0.5rem)] !absolute !bottom-0 !z-30 flex flex-col justify-between !h-56 w-52 !p-0">
                        <button class="self-center rpgui-button !p-0" type="button" @click="combat.changeDirection('up')">
                            <Icon :icon="arrowUp" width="48" height="48" />
                        </button>
                        <div class="flex justify-around">
                            <button class="rpgui-button !p-0" type="button" @click="combat.changeDirection('left')">
                                <Icon :icon="arrowLeft" width="48" height="48" />
                            </button>
                            <button class="rpgui-button !p-0" type="button" @click="combat.changeDirection('right')">
                                <Icon :icon="arrowRight" width="48" height="48" />
                            </button>
                        </div>
                        <button class="self-center rpgui-button !p-0" type="button" @click="combat.changeDirection('down')">
                            <Icon :icon="arrowDown" width="48" height="48" />
                        </button>
                        <button class="self-center rpgui-button" type="button" @click="confirmMove">
                            <h5>Conferma</h5>
                        </button>
                    </div>
                </button>
                <button class="relative !overflow-visible rpgui-button" type="button" @click="actionInv" :disabled="(combat.currentEntity instanceof Enemy)">
                    <h3>Inventario</h3>
                    <Inventory ref="invComp" />
                </button>
                <button class="rpgui-button" type="button" @click="actionSkip" :disabled="(combat.currentEntity instanceof Enemy)">
                    <h3>Passa</h3>
                </button>
            </div>
            <div ref="logElement" class="rpgui-container !static h-[198px] framed w-full !overflow-y-auto">
                <h5 ref="textElement" class="whitespace-pre-wrap">
                    {{ combat.combatLog }}
                </h5>
            </div>
            <div class="flex flex-col">
                <div class="rpgui-container !static framed grow flex flex-col items-center">
                    <h4 class="whitespace-nowrap">Prossimo turno:</h4>
                    <div class="flex items-center self-center justify-between">
                        <img :src="`/boxes/${currentBox}_box.png`" />
                        <Icon :icon="arrowRightAlt" width="64" height="64" />
                        <img :src="`/boxes/${nextBox}_box.png`" />
                    </div>
                </div>
                <button class="rpgui-button" type="button" @click="actionRun" :disabled="(combat.currentEntity instanceof Enemy)">
                    <h3>Fuggi</h3>
                </button>
            </div>
        </div>
        <div v-for="(enemy, index) in combat.enemies" class="!flex rpgui-container gap-1 right-1"
            :style="`top: ${index == 0 ? 0.25 : (index * 4.25) + 0.25}rem;`">
            <div class="flex flex-col w-32 gap-1">
                <p class="h-4 ml-auto leading-none">{{ enemy.name }}</p>
                <div class="rpgui-progress !h-[1rem] -scale-x-100">
                    <div class="rpgui-progress-track !h-[1rem] !left-4 !right-4">
                        <div class="rpgui-progress-fill !top-[3px] !bottom-[3px] red"
                            :style="`width: ${enemy.health / enemy.maxHealth * 100}%;`"></div>
                    </div>
                    <div class="!h-[1rem] !w-4 rpgui-progress-left1-edge"></div>
                    <div class="!h-[1rem] !w-4 rpgui-progress-right-edge"></div>
                </div>
                <div class="rpgui-progress !h-[1rem] -scale-x-100">
                    <div class="rpgui-progress-track !h-[1rem] !left-4 !right-4">
                        <div class="rpgui-progress-fill !top-[3px] !bottom-[3px] green"
                            :style="`width: ${enemy.mana / enemy.maxMana * 100}%;`"></div>
                    </div>
                    <div class="!h-[1rem] !w-4 rpgui-progress-left2-edge"></div>
                    <div class="!h-[1rem] !w-4 rpgui-progress-right-edge"></div>
                </div>
            </div>
            <div class="!static rpgui-container thin !p-0 h-16 w-16">
                <img :src="`/boxes/${enemy.name.slice(0, enemy.name.lastIndexOf(' ') != -1 ? enemy.name.lastIndexOf(' ') : undefined).toLowerCase()}_box.png`" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/offline'
import arrowLeft from '@iconify-icons/ic/round-arrow-left'
import arrowRight from '@iconify-icons/ic/round-arrow-right'
import arrowUp from '@iconify-icons/ic/round-arrow-drop-up'
import arrowDown from '@iconify-icons/ic/round-arrow-drop-down'
import arrowRightAlt from '@iconify-icons/ic/round-arrow-right-alt'
import Inventory from './Inventory.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { Enemy } from '../classes/Enemy'
import { Player } from '../classes/Player'
import { Entity } from '../classes/Entity'
import { useMainStore } from '../stores/mainStore'
import { useCombatStore } from '../stores/combatStore'
import { useStageStore } from '../stores/stageStore'

const main = useMainStore()
const combat = useCombatStore()
const stage = useStageStore()

const invComp = ref<InstanceType<typeof Inventory> | null>(null)
const showMove = ref(false), showAttack = ref(false)
const currentBox = ref(""), nextBox = ref("")
const logElement = ref<HTMLDivElement>(), textElement = ref<HTMLHeadingElement>()

combat.combatLog = ""
combat.currentTurn = -1
combat.orderTurn = [...main.party, ...combat.enemies]
combat.orderTurn.sort((p1, p2) => (p1.agility < p2.agility) ? 1 : (p1.agility > p2.agility) ? -1 : 0)

const getImageBox = (turn: number) => {
    if (combat.orderTurn[turn] == undefined) return "glitch"
    const getSpace = combat.orderTurn[turn].name.lastIndexOf(' ')
    return combat.orderTurn[turn].name.slice(0, getSpace != -1 ? getSpace : undefined).toLowerCase()
}

combat.$onAction(({ name, args, after }) => {
    if (name === "passTurn") {
        after(newTurn => {
            if (invComp.value) invComp.value.showInv = false
            combat.actionInRange(showAttack.value = false)
            combat.actionMove(showMove.value = false)
            
            currentBox.value = getImageBox(newTurn)
            nextBox.value = getImageBox(newTurn + 1 == combat.orderTurn.length ? 0 : newTurn + 1)

            combat.combatLog += `Ora è il turno di ${combat.currentEntity!.name}!\n`

            if (combat.currentEntity instanceof Enemy) {
                console.log(newTurn, "enemy action")
                combat.currentEntity.doAction()
            } else if (combat.currentEntity instanceof Player) {
                console.log(newTurn, "hero action")
                combat.currentEntity.addAPs(2)
            }
        })
    }
})

combat.passTurn()

onMounted(() => {
    new ResizeObserver(() => logElement.value!.scrollTop = logElement.value!.scrollHeight).observe(textElement.value!)
})

onUnmounted(() => {
    stage.enableNodes = true
    fetch(`http://localhost:8080/api/v1/party`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id_stage": stage.selectedNode,
            "members": main.party,
            "bag": main.inventory
        })
    })
})

const actionAttack = () => {
    invComp.value!.showInv = false
    combat.actionMove(showMove.value = false)
    combat.actionInRange(showAttack.value = !showAttack.value)
}

const attackEnemy = (selectedEnemy: Entity) => {
    if (combat.currentEntity instanceof Player) {
        if (combat.currentEntity.APs <= 0) {
            combat.combatLog += `${combat.currentEntity!.name} non ha abbastanza energia!\n`
            return
        }
        combat.currentEntity.useAPs(4)
    }
    showAttack.value = false
    const takenDmg = combat.currentEntity!.setDamage(combat.currentEntity!.attack, selectedEnemy)
    combat.combatLog += `${combat.currentEntity!.name} ha inflitto ${takenDmg} danni a ${selectedEnemy.name}!\n`
    combat.actionAttack(selectedEnemy)
    if (selectedEnemy.isKo) combat.combatLog += `${selectedEnemy.name} è stato sconfitto!\n`
    else if (selectedEnemy.isLowHP) combat.combatLog += `${selectedEnemy.name} è in fin di vita!\n`
    combat.actionInRange(showAttack.value = false)
}

const confirmMove = () => {
    combat.confirmMove()
    if (combat.currentEntity instanceof Player) {
        if (combat.currentEntity.APs <= 0) {
            combat.combatLog += `${combat.currentEntity!.name} non ha abbastanza energia!\n`
            return
        }
        combat.currentEntity.useAPs(3)
    }
    showMove.value = false
}

const actionSkip = () => {
    combat.combatLog += `${combat.currentEntity?.name} ha saltato il turno!\n`
    combat.passTurn()
}

const actionRun = () => main.changeScene('StageScene')

const actionMove = () => {
    showAttack.value = false
    combat.actionMove(showMove.value = !showMove.value)
    invComp.value!.showInv = false
}

const actionInv = () => {
    invComp.value?.toggleInv()
    showAttack.value = false
    combat.actionMove(showMove.value = false)
}
</script>

