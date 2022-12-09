<template>
    <div class="hidden rpgui-content" id="overlay">
        <div class="bottom-28 left-[10%] rpgui-container framed w-1/4 h-[5.5rem] !text-white">
            <h4 id="name"></h4>
        </div>
        <div class="bottom-4 left-1/2 -translate-x-1/2 relative rpgui-container transparent w-4/5 h-32 !text-white" @click="goOnScript">
            <h4 id="text"></h4>
        </div>
    </div>
</template>

<style>

</style>

<script setup lang="ts">
    import { useMainStore } from '../stores/mainStore'

    const main = useMainStore()

    const textScript = `[Federico] Ciao sono fortissimo !\n[Claudio] No, io sono fortissimo !\n[Daniele] Ma andate a cagare !`
    const lines = textScript.split('\n')

    main.$onAction(({ name, args }) => {
        if (name === 'showDialogue') {
            console.log(args[0])
            document.querySelector('#overlay')?.classList.remove('hidden')
            popupText()
        }
    })

    let scriptIndex = 0

    const popupText = () => {
        if (scriptIndex >= lines.length) {
            document.querySelector('#overlay')?.classList.add('hidden')
            scriptIndex = 0
            return
        }
        const line = lines[scriptIndex]
        const name = line.match(/\[(.*?)\]/)?.[1]
        const text = line.substring(line.lastIndexOf(']') + 1).trim()
        document.getElementById('name')!.innerText = name!
        document.getElementById('text')!.innerText = text!
    }

    const goOnScript = () => {
        scriptIndex++
        popupText()
    }
</script>