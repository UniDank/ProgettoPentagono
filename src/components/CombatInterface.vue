<template>
    <div class="rpgui-content">
        <div v-for="(player, index) in main.party" class="!flex rpgui-container gap-1 left-1" :style="`top: ${index == 0 ? 0.25 : (index * 4.25) + 0.25}rem;`">
            <div class="!static rpgui-container cool !p-0 h-16 w-16">
                <img :src="`/players/pg_box_${player.pid}.png`" />
            </div>
            <div class="flex flex-col w-32 gap-1">
                <p class="h-4 leading-none">{{ player.name }}</p>
                <div class="rpgui-progress !h-[1rem]">
                    <div class="rpgui-progress-track !h-[1rem] !left-4 !right-4">
                        <div class="rpgui-progress-fill !top-[3px] !bottom-[3px] red" :style="`width: ${player.health / player.maxHealth * 100}%;`"></div>
                    </div>
                    <div class="!h-[1rem] !w-4 rpgui-progress-left1-edge"></div>
                    <div class="!h-[1rem] !w-4 rpgui-progress-right-edge"></div>
                </div>
                <div class="rpgui-progress !h-[1rem]">
                    <div class="rpgui-progress-track !h-[1rem] !left-4 !right-4">
                        <div class="rpgui-progress-fill !top-[3px] !bottom-[3px] green" :style="`width: ${player.mana / player.maxMana * 100}%;`"></div>
                    </div>
                    <div class="!h-[1rem] !w-4 rpgui-progress-left2-edge"></div>
                    <div class="!h-[1rem] !w-4 rpgui-progress-right-edge"></div>
                </div>
            </div>
        </div>
        <div class="flex w-[99%] gap-2 bottom-1 left-1 rpgui-container">
            <div class="flex flex-col">
                <button class="rpgui-button" type="button" @click="actionAttack"><p>Attacca</p></button>
                <button class="rpgui-button" type="button" @click="actionMove"><p>Muoviti</p></button>
                <button class="relative !overflow-visible rpgui-button" type="button" @click="invComp?.toggleInv()">
                    <p>Inventario</p>
                    <Inventory ref="invComp" />
                </button>
                <button class="rpgui-button" type="button" @click="actionSkip"><p>Passa</p></button>
            </div>
            <div class="flex flex-col rpgui-container !static framed w-full">
                <h5 class="whitespace-pre">
                    {{ combatLog }}
                </h5>
            </div>
        </div>
        <div v-for="(enemy, index) in enemies" class="!flex rpgui-container gap-1 right-1" :style="`top: ${index == 0 ? 0.25 : (index * 4.25) + 0.25}rem;`">
            <div class="flex flex-col w-32 gap-1">
                <p class="h-4 ml-auto leading-none">{{ enemy.name }}</p>
                <div class="rpgui-progress !h-[1rem] -scale-x-100">
                    <div class="rpgui-progress-track !h-[1rem] !left-4 !right-4">
                        <div class="rpgui-progress-fill !top-[3px] !bottom-[3px] red" :style="`width: ${enemy.health / enemy.maxHealth * 100}%;`"></div>
                    </div>
                    <div class="!h-[1rem] !w-4 rpgui-progress-left1-edge"></div>
                    <div class="!h-[1rem] !w-4 rpgui-progress-right-edge"></div>
                </div>
                <div class="rpgui-progress !h-[1rem] -scale-x-100">
                    <div class="rpgui-progress-track !h-[1rem] !left-4 !right-4">
                        <div class="rpgui-progress-fill !top-[3px] !bottom-[3px] green" :style="`width: ${enemy.mana / enemy.maxMana * 100}%;`"></div>
                    </div>
                    <div class="!h-[1rem] !w-4 rpgui-progress-left2-edge"></div>
                    <div class="!h-[1rem] !w-4 rpgui-progress-right-edge"></div>
                </div>
            </div>
            <div class="!static rpgui-container cool !p-0 h-16 w-16">
                <img :src="`${enemy.name}`" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Inventory from './Inventory.vue'
    import { ref, reactive } from 'vue'
    import { Enemy } from '../classes/Enemy'
    import { useMainStore } from '../stores/mainStore'

    const main = useMainStore()

    const invComp = ref<InstanceType<typeof Inventory> | null>(null)

    const combatLog = ref("Claphos ha subito 2 danni!\nClaphos è in fin di vita!")

    const enemies = reactive<Enemy[]>([
        new Enemy("Pippo", 10, 10),
        new Enemy("Pikachu", 10, 10),
        new Enemy("Tumore", 10, 10)
    ])

    const actionAttack = () => console.log("attack")

    const actionMove = () => console.log("move")

    const actionSkip = () => console.log("skip turn")
</script>