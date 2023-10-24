<script lang="ts">
	import { goto } from '$app/navigation'
	import * as Card from '$lib/components/ui/card'
	import type { createDesignSystemsStore } from '$lib/features/token-groups-store/designSystemsIds'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'
	import { getContext } from 'svelte'
	import { v4 as uuidv4 } from 'uuid'
	import { Input } from '$lib/components/ui/input'
	import { Button } from '$lib/components/ui/button'
	import { SquareEqual } from 'lucide-svelte'
	import { Separator } from '$lib/components/ui/separator'
	import Logo from '$lib/components/Logo.svelte'

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')
	const tokenbaseMainStore: ReturnType<typeof createDesignSystemsStore> =
		getContext('tokenBaseMainStore')

	let designSystemName = ''

	const handleSubmitForm = async () => {
		const designSystem = $tokenbaseMainStore.find(
			(designSystem) =>
				designSystem.name.toUpperCase() === designSystemName.toUpperCase()
		)

		if (designSystem) {
			await goto(`/${designSystem.id}`)
		} else {
			await addDesignSystem()
		}
	}

	const addDesignSystem = async () => {
		const designSystemId = uuidv4()

		await goto(`/${designSystemId}`)

		tokenbaseMainStore.addDesignSystem(
			designSystemId,
			designSystemName ?? 'New Design System'
		)
	}

	$: designSystemExists = $tokenbaseMainStore.find(
		(designSystem) =>
			designSystem.name.toUpperCase() === designSystemName.toUpperCase()
	)
</script>

<header
	class="z-10 flex flex-row items-center justify-between px-20 py-6 shadow-sm"
>
	<Logo />
	<nav>
		<ul>
			<li>
				<a
					href="https://token-base.com/"
					class="text-slate-400 transition-colors hover:text-slate-900">Blog</a
				>
			</li>
		</ul>
	</nav>
</header>
<section class="flex flex-1 items-center justify-center p-20">
	<div
		class="flex max-w-2xl flex-1 flex-col items-center justify-center gap-20"
	>
		<div class="flex flex-col gap-2">
			<h1 class="text-center text-xl font-medium">
				Welcome to Our Open BETA Version
			</h1>
			<span class="text-center text-slate-500">
				As we are currently in the exciting phase of our open BETA version, your
				feedback and experience are invaluable in shaping the future of our
				application.
			</span>
			<span class="text-center text-slate-500">
				Join our <a
					class="text-blue-700"
					href="https://discord.gg/Xt36BDhdXj"
					target="_blank">Discord community</a
				> and share your feedback with us!
			</span>
		</div>
		<form
			on:submit|preventDefault={() => handleSubmitForm()}
			class="relative flex w-full flex-row gap-2"
		>
			<Input
				id="name"
				bind:value={designSystemName}
				class="w-full rounded-full border border-slate-200 bg-white p-6 pr-24 text-lg font-medium shadow-md placeholder:font-normal placeholder:text-slate-300"
				placeholder="Enter the name of your Design System"
				autocomplete="off"
				autoSelect={true}
			/>
			<Button
				class={`absolute right-4 top-1/2 flex -translate-y-1/2 transform items-center px-2 font-normal ${
					designSystemName.length > 0 ? 'text-slate-500' : 'text-slate-300'
				}`}
				variant="ghost"
				type="submit"
			>
				{#if designSystemName.length > 0}
					{#if designSystemExists}
						{`Open  `}
					{:else}
						{`Create`}
					{/if}
				{/if}
				⏎
			</Button>
		</form>
		{#if $tokenbaseMainStore.length > 0}
			<div class="w-full">
				<div class="mb-4 w-full">
					<h2 class="px-4 py-2 text-slate-300">Design Systems</h2>
					<Separator
						class="bg-gradient-to-r from-slate-200 via-slate-300 to-slate-100"
					/>
				</div>
				<div class="grid grid-cols-3 gap-5">
					{#each $tokenbaseMainStore as designSystem}
						{@const activeDesignSystem =
							designSystem.name.toUpperCase() ===
							designSystemName.toUpperCase()}
						<a
							href={`/${designSystem.id}`}
							class="min-w-[200px] max-w-md rounded-lg border bg-slate-50 text-slate-900 transition-all duration-500 hover:border-slate-800 hover:bg-white hover:shadow-lg"
							class:border-slate-800={activeDesignSystem}
							class:shadow-lg={activeDesignSystem}
							class:bg-white={activeDesignSystem}
						>
							<Card.Root class="border-none bg-transparent">
								<Card.Header class="p-4">
									<Card.Title
										class="overflow-hidden text-ellipsis whitespace-break-spaces text-sm font-medium"
										>{designSystem.name}</Card.Title
									>
								</Card.Header>
							</Card.Root>
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	section {
		background: linear-gradient(
				rgba(242, 245, 249, 0.8),
				rgba(242, 245, 249, 0.99),
				rgba(242, 245, 249, 1),
				rgba(242, 245, 249, 1)
			),
			conic-gradient(
					from 90deg at 1px 1px,
					hsla(0, 0%, 0%, 0) 90deg,
					rgb(230, 230, 230) 0
				) -2px -2px/25px 25px;
	}
</style>
