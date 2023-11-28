<script lang="ts">
    import { X } from 'lucide-svelte';
    import * as  Card  from "$lib/components/ui/card"
    import ToastIcon from "./atoms/ToastIcon.svelte";
    import { createEventDispatcher } from 'svelte'
    import type { ToastType } from "./types/toast.interface";
    import ToastLeftBar from "./atoms/ToastLeftBar.svelte";

    export let type: ToastType;
    export let message: string;
    export let date: Date
    export let color: string
    const dispatch = createEventDispatcher()

    let minutes = date.getMinutes()
    let hour = date.getHours()

    if(minutes<10){
        minutes = '0' + minutes
    }
    if(hour<10){
        hour = '0' + hour
    }

    function handleClickOnX() {
      dispatch('dismiss')
    }
</script>
  
    <Card.Root class="w-[340px] min-h-28" >
            <div class="grid grid-cols-[2px,300px,38px] transition:fade">
                <ToastLeftBar {type}/>
                <div>
                    <ToastIcon {type}/>
                    <div class="text-base pl-16 pr-4 pt-1">
                        <p>{message}</p>
                    </div>
                    <div class="text-slate-500 pt-1 pl-16 pb-5">
                        {hour}:{minutes}
                    </div>
                </div>
                <div class="pt-6 items-start hover:cursor-pointer h-6" on:click={handleClickOnX}>
                    <X class="h-4 w-4" color={"gray"} ></X>
                </div>
            </div>
    </Card.Root>
