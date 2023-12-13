<script lang="ts">
    export let page: number;
    export let selected: boolean;
</script>

<div class="{selected ? 'bg-primary border-white text-primary-foreground' : 'bg-white border-slate-400 text-slate-400'} border w-8 h-8 rounded flex items-center justify-center">
    <p class="text-lg text-center">{page}</p>
</div>