<template>
    <div class="rpgui-content">
        <div v-for="(player, index) in 5" class="!flex rpgui-container gap-1 left-1" :style="`top: ${index == 0 ? 0.25 : (index * 4.25) + 0.25}rem;`">
            <div class="!static rpgui-container cool !p-0 h-16 w-16">
                <img :src="`/pg_image_${player}.png`" />
            </div>
        </div>
        <div class="flex w-[99%] gap-2 bottom-1 left-1 rpgui-container">
            <div class="flex flex-col">
                <button class="rpgui-button" type="button" @click="actionAttack"><p>Attacca</p></button>
                <button class="rpgui-button" type="button" @click="actionMove"><p>Muoviti</p></button>
                <button class="rpgui-button" type="button" @click="actionInventory"><p>Inventario</p></button>
                <button class="rpgui-button" type="button" @click="actionSkip"><p>Passa</p></button>
            </div>
            <div class="flex flex-col rpgui-container !static framed w-full">
                <h5>
                    Claphos ha subito 2 danni!
                </h5>
            </div>
            <div class="flex flex-col !p-1 rpgui-container !static framed">
                
            </div>
        </div>
        <div v-for="(enemy, index) in 3" class="!flex rpgui-container gap-1 right-1" :style="`top: ${index == 0 ? 0.25 : (index * 4.25) + 0.25}rem;`">
            <div class="!static rpgui-container cool !p-0 h-16 w-16">
                <img :src="``" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    const actionAttack = () => console.log("attack")

    const actionMove = () => console.log("move")

    const actionInventory = () => console.log("inventory")

    const actionSkip = () => console.log("skip turn")
</script>