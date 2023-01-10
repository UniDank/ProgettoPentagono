<template>
    <div v-show="show" @click.stop
        class="rpgui-container framed !left-[calc(100%+0.5rem)] !absolute !bottom-0 !z-30 flex flex-col !h-56 w-52 !p-0">
        <div v-for="(item, index) in main.inventory.slice(currentPage * 5, (currentPage + 1) * 5)"
            class="flex items-center justify-between gap-1 px-1 py-1 hover:bg-black/75" @click="showPlayers(index)">
            <div class="rpgui-icon !w-6 !h-6" :class="item.type"></div>
            <h5>{{ item.name }}</h5>
            <h5>{{ item.type == ItemType.Lyre ? '' : `x${item.quantity}` }}</h5>
        </div>
        <div class="flex items-center justify-between gap-1 mt-auto">
            <button class="rpgui-button !py-0 !px-3" type="button" @click="currentPage = Math.max(currentPage -= 1, 0)">
                <Icon :icon="arrowLeft" class="w-8 h-8" />
            </button>
            <h5>{{ currentPage+ 1 }} di {{ numPages }}</h5>
            <button class="rpgui-button !py-0 !px-3" type="button"
                @click="currentPage = Math.min(currentPage += 1, numPages - 1)">
                <Icon :icon="arrowRight" class="w-8 h-8" />
            </button>
        </div>
        <div v-show="addList.some(v => v)"
            class="rpgui-container framed !absolute !left-[calc(100%+0.75rem)] !-bottom-4 !z-30 flex flex-col gap-1 !h-auto w-52 !p-0">
            <div v-for="player in main.party"
                @click="addToPlayer(main.inventory[addList.findIndex(v => v)], player)"
                class="relative flex items-center gap-2 px-1 py-1 hover:bg-black/75">
                <img :src="`/boxes/${player.name.toLowerCase()}_box.png`" class="w-8 h-8" />
                <h5>{{ player.name }}</h5>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/offline'
import arrowLeft from '@iconify-icons/ic/round-arrow-left'
import arrowRight from '@iconify-icons/ic/round-arrow-right'
import { Player } from '../classes/Player'
import { ref, watch } from 'vue'
import { useMainStore } from '../stores/mainStore'
import { Item, ItemType } from '../classes/Inventory'

const main = useMainStore()

const show = ref(false)

const numPages = Math.ceil(main.inventory.length / 5)
const currentPage = ref(0)

watch(currentPage, () => addList.value.fill(false))

const addList = ref<boolean[]>(main.inventory.map(() => false))

const toggleInv = () => {
    show.value = !show.value
    if (show.value == false) addList.value.fill(false)
}

const showPlayers = (index: number) => {
    addList.value.fill(false)
    addList.value[index] = true
}

const addToPlayer = (item: Item, player: Player) => {
    if (item.type == ItemType.Health && player.health > 0 && player.health != player.maxHealth) {
        player.addHealth(item.value)
        item.quantity -= 1
    } else if (item.type == ItemType.Mana && player.mana != player.maxMana) {
        player.addMana(item.value)
        item.quantity -= 1
    } else if (item.type == ItemType.Lyre && player.health <= 0) {
        player.addHealth(player.maxHealth)
        player.addMana(player.maxMana)
        player.addAP(player.maxAPs)
    } else if (item.type == ItemType.Energy && player.APs > 0 && player.APs != player.maxAPs) {
        player.APs += item.value
        item.quantity -= 1
    }
    main.inventory = main.inventory.filter(v => v.quantity > 0)
}

defineExpose({
    toggleInv, showInv: show
})
</script>