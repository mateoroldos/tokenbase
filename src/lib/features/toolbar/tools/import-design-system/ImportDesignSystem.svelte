<script lang="ts">
    import { preview } from "$lib/features/viewMode/stores/preview";
    import { viewMode } from "$lib/features/viewMode/stores/viewMode";
    import Button from "$lib/components/ui/button/Button.svelte";

    function handleClickButton(){
        preview.set(false);
        viewMode.set(false);
    }
</script>


<Button on:click={handleClickButton}>Import</Button>