<script lang="ts">
	import { ChevronRight } from 'lucide-svelte'
	import { fade, fly } from 'svelte/transition'
	import CategoryScrollBar from '../_components/Category/CategoryScrollBar.svelte'
	import type { Post } from '../interface'

	export let data

	const uniqueCategories = data.uniqueCategories
	let categorizedPosts: { [key: string]: Post[] } = {}
	categorizedPosts = data.posts
</script>

<svelte:head>
	<title>Blog | Categories</title>
</svelte:head>

<h1
	class="font-bold text-3xl text-center gap-x-8 py-16 sm:text-5xl"
	in:fade={{ delay: 300 }}
>
	All blog categories
</h1>
<div in:fade={{ delay: 300, duration: 300 }}>
	{#each uniqueCategories as category}
		<li class="list-none w-3/5 sm:w-1/5">
			<a
				href="/category/{category.title}"
				class="text-primary text-lg capitalize font-bold flex items-center relative group sm:text-2xl sm:ml-6"
			>
				<div class="flex items-center">
					<span
						class="pr-1"
						in:fly|global={{ x: -100, duration: 300, delay: 300 }}
						>{category.title}</span
					>
					<div
						class="pl-2 flex flex-row align-baseline self-end opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
					>
						<p class="text-xs text-[#0d9488]">See all</p>
						<ChevronRight
							size={16}
							class="self-center pr-1 transform translate-x-6 group-hover:translate-x-0 text-[#0d9488] transition-transform duration-300 ease-in-out"
						></ChevronRight>
					</div>
				</div>
			</a>
		</li>
		<div class="pl-8">
			<CategoryScrollBar posts={categorizedPosts[category.title] ?? []}
			></CategoryScrollBar>
		</div>
	{/each}
</div>
