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
                        <div class="rpgui-progress-fill !top-[3px] !bottom-[3px] blue"
                            :style="`width: ${player.mana / player.maxMana * 100}%;`"></div>
                    </div>
                    <div class="!h-[1rem] !w-4 rpgui-progress-left3-edge"></div>
                    <div class="!h-[1rem] !w-4 rpgui-progress-right-edge"></div>
                </div>
            </div>
        </div>
        <div class="flex w-[99%] gap-2 bottom-1 left-1 rpgui-container">
            <div class="flex flex-col">
                <button class="rpgui-button" type="button" @click="actionAttack" :disabled="(combat.currentEntity instanceof Enemy)">
                    <h3>Attacca</h3>
                </button>
                <button class="relative !overflow-visible rpgui-button" type="button" @click="actionMove" :disabled="(combat.currentEntity instanceof Enemy)">
                    <h3>Muoviti</h3>
                    <div v-show="showMove" @click.stop
                        class="rpgui-container framed !left-[calc(100%+0.5rem)] !absolute !bottom-0 !z-30 flex flex-col justify-between !h-56 w-52 !p-0">
                        <button class="self-center rpgui-button !p-0" type="button" @click="moveUp">
                            <Icon :icon="arrowUp" width="48" height="48" />
                        </button>
                        <div class="flex justify-around">
                            <button class="rpgui-button !p-0" type="button" @click="moveLeft">
                                <Icon :icon="arrowLeft" width="48" height="48" />
                            </button>
                            <button class="rpgui-button !p-0" type="button" @click="moveRight">
                                <Icon :icon="arrowRight" width="48" height="48" />
                            </button>
                        </div>
                        <button class="self-center rpgui-button !p-0" type="button" @click="moveDown">
                            <Icon :icon="arrowDown" width="48" height="48" />
                        </button>
                        <div class="flex justify-between">
                            <button class="rpgui-button" type="button" @click="confirmMove">
                                <h5>Conferma</h5>
                            </button>
                            <button class="rpgui-button !px-2" type="button" @click="combat.toggleMoveMode()">
                                <Icon :icon="combat.moveMode ? arrowsIcon : mouseIcon" width="32" height="32" />
                            </button>
                        </div>
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
                        <img :src="`/boxes/${orderTurn[currentTurn].name.toLowerCase()}_box.png`" />
                        <Icon :icon="arrowRightAlt" width="64" height="64" />
                        <img :src="`/boxes/${orderTurn[currentTurn + 1].name.toLowerCase()}_box.png`" />
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
                <p class="h-4 ml-auto leading-none">{{ isNaN(Number(enemy.name[enemy.name.length - 1])) ? enemy.name : `${enemy.name.slice(0, -1)} ${enemy.name[enemy.name.length - 1]}` }}</p>
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
                        <div class="rpgui-progress-fill !top-[3px] !bottom-[3px] blue"
                            :style="`width: ${enemy.mana / enemy.maxMana * 100}%;`"></div>
                    </div>
                    <div class="!h-[1rem] !w-4 rpgui-progress-left3-edge"></div>
                    <div class="!h-[1rem] !w-4 rpgui-progress-right-edge"></div>
                </div>
            </div>
            <div class="!static rpgui-container thin !p-0 h-16 w-16">
                <img :src="`/boxes/${isNaN(Number(enemy.name[enemy.name.length - 1])) ? enemy.name.toLowerCase() : enemy.name.slice(0, -1).toLowerCase()}_box.png`" />
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
import mouseIcon from '@iconify-icons/ic/round-mouse'
import arrowsIcon from '@iconify-icons/ic/round-compare-arrows'
import arrowRightAlt from '@iconify-icons/ic/round-arrow-right-alt'
import Inventory from './Inventory.vue'
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { Enemy } from '../classes/Enemy'
import { Player } from '../classes/Player'
import { useMainStore } from '../stores/mainStore'
import { useCombatStore } from '../stores/combatStore'
import { useStageStore } from '../stores/stageStore'

const main = useMainStore()
const combat = useCombatStore()
const stage = useStageStore()

const invComp = ref<InstanceType<typeof Inventory> | null>(null)
const showMove = ref(false)
const logElement = ref<HTMLDivElement>(), textElement = ref<HTMLHeadingElement>()

combat.combatLog = ""

const currentTurn = ref(0)
const orderTurn = reactive<(Player | Enemy)[]>([...main.party, ...combat.enemies])
orderTurn.sort((p1, p2) => (p1.agility < p2.agility) ? 1 : (p1.agility > p2.agility) ? -1 : 0)
combat.currentTurn = currentTurn.value
combat.orderTurn = orderTurn
combat.currentEntity = orderTurn[currentTurn.value]
combat.combatLog += `Ora è il turno di ${combat.currentEntity.name}!\n`

watch([orderTurn, currentTurn], async () => {
    if (currentTurn.value == orderTurn.length) currentTurn.value = 0
    combat.currentEntity = orderTurn[currentTurn.value]
    combat.combatLog += `Ora è il turno di ${combat.currentEntity.name}!\n`
    if (combat.enemies.length == 0 || main.party.length == 0) {
        const totalExp = combat.enemies.map(v => v.expReward).reduce((c, p) => c + p)
        main.party.forEach(v => v.addExp(totalExp / 5))
    }
    combat.currentTurn = currentTurn.value
    combat.orderTurn = orderTurn
})

combat.$subscribe((store, vars) => currentTurn.value = vars.currentTurn)

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
    }).then(() => main.changeScene('StageScene'))
})

const actionAttack = () => {
    if((orderTurn[currentTurn.value] as Player).APs <= 0) {
        currentTurn.value++
        return
    }
    orderTurn[currentTurn.value].setDamage(orderTurn[currentTurn.value].attack, orderTurn[combat.selectedEntity])
    combat.combatLog += `${orderTurn[currentTurn.value].name} ha inflitto ${orderTurn[currentTurn.value].attack} danni a ${orderTurn[combat.selectedEntity].name}!\n`
    combat.actionAttack(currentTurn.value)
}

const moveUp = () => combat.moveDirection = "up"

const moveDown = () => combat.moveDirection = "down"

const moveLeft = () => combat.moveDirection = "left"

const moveRight = () => combat.moveDirection = "right"

const confirmMove = () => {
    combat.isConfirmed = true
    combat.combatLog += `${combat.currentEntity?.name} si è spostato!\n`
    showMove.value = false
}

const actionSkip = () => {
    combat.combatLog += `${combat.currentEntity?.name} ha saltato il turno!\n`
    currentTurn.value++
}

const actionRun = () => main.changeScene('StageScene')

const actionMove = () => {
    showMove.value = !showMove.value
    combat.actionMove(showMove.value)
    invComp.value!.showInv = false
}

const actionInv = () => {
    invComp.value?.toggleInv()
    showMove.value = false
}
</script>

