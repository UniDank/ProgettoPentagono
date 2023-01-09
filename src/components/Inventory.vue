<template>
    <div v-show="show" @click.stop 
        class="rpgui-container framed !left-[calc(100%+0.5rem)] !absolute !bottom-0 !z-30 flex flex-col !h-56 w-52 !p-0">
        <div v-for="(item, index) in main.inventory.items.slice(currentPage * 5, (currentPage + 1) * 5)"
            class="flex items-center justify-between gap-1 px-1 py-1 hover:bg-black/75" @click="showPlayers(index)">
            <div class="rpgui-icon !w-6 !h-6" :class="item.type"></div>
            <h5>{{ item.name }}</h5>
            <h5>x{{ item.quantity }}</h5>
        </div>
        <div class="flex items-center justify-between gap-1 mt-auto">
            <button class="rpgui-button !py-0 !px-3" type="button" @click="currentPage = Math.max(currentPage -= 1, 0)">
                <Icon :icon="arrowLeft" class="w-8 h-8" />
            </button>
            <h5>{{ currentPage+1 }} di {{ numPages }}</h5>
            <button class="rpgui-button !py-0 !px-3" type="button" @click="currentPage = Math.min(currentPage += 1, numPages-1)">
                <Icon :icon="arrowRight" class="w-8 h-8" />
            </button>
        </div>
        <div v-show="addList.some(v => v)" 
            class="rpgui-container framed !absolute !left-[calc(100%+0.75rem)] !-bottom-4 !z-30 flex flex-col gap-1 !h-auto w-52 !p-0">
            <div v-for="player in main.party" @click="addToPlayer(main.inventory.items[addList.findIndex(v => v)], player)"
                class="relative flex items-center gap-2 px-1 py-1 hover:bg-black/75">
                <img :src="`/boxes/pg_box_${player.pid}.png`" class="w-8 h-8" />
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
    import { Item } from '../classes/Inventory'

    const main = useMainStore()

    const show = ref(false)

    const numPages = Math.ceil(main.inventory.items.length / 5)
    const currentPage = ref(0)

    watch(currentPage, () => addList.value.fill(false))

    const addList = ref<boolean[]>(main.inventory.items.map(() => false))

    const toggleInv = () => {
        show.value = !show.value
        if (show.value == false) addList.value.fill(false)
    }

    const showPlayers = (index: number) => {
        addList.value.fill(false)
        addList.value[index] = true
    }

    const addToPlayer = (item: Item, player: Player) => {
        //TODO: fare azioni sul player in base all'item
    }

    defineExpose({
        toggleInv, showInv: show
    })
</script>