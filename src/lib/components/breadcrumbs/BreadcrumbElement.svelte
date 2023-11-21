<script lang="ts">
	export let name: string
	export let href: string
</script>

<a
	{href}
	class="text-sm font-medium text-slate-400 transition-colors hover:text-slate-500"
>
	{name}
</a>
