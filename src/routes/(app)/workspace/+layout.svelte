<script lang="ts">
	let innerWidth: number
</script>

<svelte:window bind:innerWidth />

{#if innerWidth < 1000}
	<section
		class="container flex flex-1 flex-col gap-7 items-center justify-center"
	>
		<div class="text-xl font-medium text-slate-800">
			<img
				src="/LOGO_TOKENBASE.png"
				alt="Token-base logo"
				class="mb-1 inline-block h-6 w-6"
			/>
			Tokenbase
		</div>
		<p class="text-slate-500 max-w-[35ch] text-center">
			For a better user experience please use a device with a larger screen.
		</p>
		<p class="text-slate-500 max-w-[35ch] text-center">
			We take this opportunity to invite you to our <a
				class="text-blue-700"
				href="https://discord.gg/Xt36BDhdXj"
				target="_blank">Discord community</a
			>!
		</p>
	</section>
{:else}
	<slot />
{/if}
